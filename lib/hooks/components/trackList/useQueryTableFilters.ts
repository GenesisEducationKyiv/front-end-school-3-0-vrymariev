'use client';
import {
	TracksRequestQueryParams,
	TracksTableMeta,
	TracksTableOrder,
	TracksTablePage,
	TracksTableSorting,
} from '@models/zod/track.table.schema';
import { useQueryParamsOption } from './useQueryParamsOption';
import { useUpdateQuery } from './useUpdateQuery';
import { useCallback } from 'react';

export const useQueryTableFilters = () => {
	const updateQuery = useUpdateQuery();
	const { queryParams } = useQueryParamsOption();

	const updateQueryString = useCallback(
		(filter: TracksRequestQueryParams) => {
			updateQuery(filter);
		},
		[updateQuery],
	);

	const setMetaQuery = useCallback(
		(filter: TracksTableMeta) => {
			updateQueryString(filter);
		},
		[updateQuery],
	);

	const setPageQuery = useCallback(
		(page: TracksTablePage) => {
			updateQueryString({ page });
		},
		[updateQuery],
	);

	const setSortingQuery = useCallback(
		(sorting: { sort: TracksTableSorting; order: TracksTableOrder }) => {
			updateQueryString(sorting);
		},
		[updateQuery],
	);

	return { setMetaQuery, setPageQuery, setSortingQuery, queryFilters: queryParams };
};
