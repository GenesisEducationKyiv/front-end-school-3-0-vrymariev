'use client';
import { DataTable } from './DataTable';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Filters } from './Filters';
import { useDebounce } from '@lib/hooks/useDebounce';
import { useTrackModal } from '@context/TrackModalContext';
import { useTracks } from '@lib/hooks/fetchers/useFetchTracks';
import { getTrackColumns } from './Columns';
import { TracksRequestQueryParams, tracksRequestSortingSchema } from '@models/zod/track.schema';

export function TracksList() {
	const [tableSorting, setTableSort] = useState<SortingState>([]);
	const [tablePagination, setTablePagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

	const [searchFilter, setSearchFilter] = useState<string>('');
	const debouncedSearch = useDebounce(searchFilter, 300);
	const [artistFilter, setArtistFilter] = useState<string | undefined>();
	const [genreFilter, setGenreFilter] = useState<string | undefined>();
	const parsedSortField = tracksRequestSortingSchema.safeParse(tableSorting[0]?.id);

	const { openModal } = useTrackModal();

	const filters = useMemo<TracksRequestQueryParams>(() => {
		return {
			sort: parsedSortField.success ? parsedSortField.data : undefined,
			order: tableSorting[0]?.desc ? 'desc' : 'asc',
			artist: artistFilter,
			genre: genreFilter,
			search: debouncedSearch,
			page: tablePagination.pageIndex + 1,
			limit: tablePagination.pageSize,
		};
	}, [tableSorting, debouncedSearch, artistFilter, genreFilter, tablePagination]);

	const { data, isLoading, error } = useTracks(filters);
	const hasData = data && data.data.length > 0;

	const columns = useMemo(() => getTrackColumns(openModal), [openModal]);

	return (
		<div className="flex flex-row gap-10">
			<Filters
				search={searchFilter}
				onSearchChanged={setSearchFilter}
				artistFilter={artistFilter}
				onArtistFilterChanged={setArtistFilter}
				genreFilter={genreFilter}
				onGenreFilterChanged={setGenreFilter}
			/>

			{isLoading && !hasData && (
				<div className="text-gray-500" data-testid="loading-tracks">
					Loading table...
				</div>
			)}

			{!isLoading && hasData && (
				<DataTable
					columns={columns}
					data={data.data}
					sorting={tableSorting}
					onSortingChanged={setTableSort}
					pagination={tablePagination}
					onPaginationChange={setTablePagination}
					pageCount={data.meta.totalPages}
					rowCount={data.meta.total}
				/>
			)}

			{!hasData && !isLoading && <div className="text-gray-400 italic">Empty tracks list</div>}
		</div>
	);
}
