'use client';
import { PaginationState } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { useTracksQuery } from '@lib/hooks/queries/useTracksQuery';
import { useQueryTableFilters } from '@lib/hooks/components/trackList/useQueryTableFilters';
import { TracksTableSorting } from '@models/zod/track.table.schema';
import { DataTableSorting } from '@components/tracksManager/tacksList/DataTable';
import { getTrackColumns } from '@components/tracksManager/tacksList/Columns';
import { useTrackModalStore } from '@store/trackModalStore';

export const useTracksListController = () => {
	const { queryFilters, setSortingQuery, setPageQuery } = useQueryTableFilters();

	const { openModal } = useTrackModalStore();

	const { data, isLoading, error } = useTracksQuery(queryFilters);
	const trackTableColumns = useMemo(() => getTrackColumns(openModal), [openModal]);

	useEffect(() => {
		if (queryFilters.page && data?.meta.totalPages && queryFilters.page > data?.meta.totalPages) {
			setPageQuery(data?.meta.totalPages);
		}
	}, [queryFilters.page, data?.meta.totalPages]);

	const tableSorting = useMemo<DataTableSorting<TracksTableSorting>>(() => {
		if (!queryFilters.sort) return [];
		return [{ id: queryFilters.sort, desc: queryFilters.order === 'desc' }];
	}, [queryFilters.sort, queryFilters.order]);

	const tablePagination = useMemo<PaginationState>(() => {
		const pageTableFormat = (queryFilters.page || 0) - 1;
		return { pageIndex: pageTableFormat, pageSize: queryFilters.limit || 10 };
	}, [queryFilters.page, queryFilters.limit]);

	const onSortingChanged = (sorting: DataTableSorting<TracksTableSorting>) => {
		const [sort] = sorting;
		if (sort) {
			setSortingQuery({ sort: sort.id, order: sort.desc ? 'desc' : 'asc' });
		}
	};

	const onPageChange = (pagination: PaginationState) => {
		setPageQuery(pagination.pageIndex + 1);
	};

	return {
		data,
		isLoading,
		error,
		trackTableColumns,
		tableSorting,
		tablePagination,
		onSortingChanged,
		onPageChange,
	};
};
