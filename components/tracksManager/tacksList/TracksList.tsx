'use client';
import { Filters } from './Filters';
import { Track } from '@models/zod/track.schema';
import { TracksTableSorting } from '@models/zod/track.table.schema';
import { useTracksListController } from '@lib/hooks/components/trackList/useTracksListController';
import dynamic from 'next/dynamic';

const DataTable = dynamic(() => import('./DataTable').then((mod) => mod.DataTable<Track, unknown, TracksTableSorting>), {
	ssr: false,
	loading: () => <div className="text-gray-500">Loading table...</div>,
});

export function TracksList() {
	const { data, isLoading, error, trackTableColumns, tableSorting, tablePagination, onSortingChanged, onPageChange } =
		useTracksListController();
	const hasData = data && data.data.length > 0;
	// console.log('Are we running on server? TracksList? : ', typeof window === 'undefined');
	return (
		<div className="flex flex-row gap-10">
			<Filters />

			{isLoading && !hasData && (
				<div className="text-gray-500" data-testid="loading-tracks">
					Loading table...
				</div>
			)}

			{!isLoading && hasData && (
				<DataTable
					columns={trackTableColumns}
					data={data.data}
					sorting={tableSorting}
					onSortingChanged={onSortingChanged}
					pagination={tablePagination}
					onPaginationChange={onPageChange}
					pageCount={data.meta.totalPages}
					rowCount={data.meta.total}
				/>
			)}

			{!hasData && !isLoading && <div className="text-gray-400 italic">Empty tracks list</div>}
		</div>
	);
}
