import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, Mock } from 'vitest';

import { useTracksListController } from '@lib/hooks/components/trackList/useTracksListController';

vi.mock('@lib/hooks/fetchers/useFetchTracks');
vi.mock('@lib/hooks/components/trackList/useQueryTableFilters');
vi.mock('@context/TrackModalContext');
vi.mock('@components/tracksManager/tacksList/Columns', () => ({
	getTrackColumns: vi.fn(),
}));

import { useTracks } from '@lib/hooks/fetchers/useFetchTracks';
import { useQueryTableFilters } from '@lib/hooks/components/trackList/useQueryTableFilters';
import { getTrackColumns } from '@components/tracksManager/tacksList/Columns';
import type { PaginationState } from '@tanstack/react-table';

const mockSetSortingQuery = vi.fn();
const mockSetPageQuery = vi.fn();
const mockOpenModal = vi.fn();
const fakeColumns = [{ id: 'foo', header: 'Foo' }];

const fakeTrackData = {
	data: [{ id: '1', title: 'Test Track' }],
	meta: { totalPages: 5 },
};

vi.mock('@store/trackModalStore', () => {
	return {
		useTrackModalStore: () => ({
			modalState: undefined,
			isOpen: false,
			openModal: mockOpenModal,
			closeModal: vi.fn(),
		}),
	};
});

describe('useTracksListController', () => {
	beforeEach(() => {

		(getTrackColumns as Mock).mockReturnValue(fakeColumns);

		(useQueryTableFilters as Mock).mockReturnValue({
			queryFilters: {
				page: 2,
				limit: 10,
				sort: 'title',
				order: 'asc',
			},
			setSortingQuery: mockSetSortingQuery,
			setPageQuery: mockSetPageQuery,
		});

		(useTracks as Mock).mockReturnValue({
			data: fakeTrackData,
			isLoading: false,
			error: null,
		});
	});

	it('returns correct data, loading state and columns', () => {
		const { result } = renderHook(() => useTracksListController());

		expect(result.current.data).toEqual(fakeTrackData);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBeNull();
		expect(getTrackColumns).toHaveBeenCalledWith(mockOpenModal);
		expect(result.current.trackTableColumns).toEqual(fakeColumns);
	});

	it('maps queryFilters to tableSorting and tablePagination', () => {
		const { result } = renderHook(() => useTracksListController());

		expect(result.current.tableSorting).toEqual([{ id: 'title', desc: false }]);
		expect(result.current.tablePagination).toEqual({ pageIndex: 1, pageSize: 10 });
	});

	it('returns empty tableSorting if sort is undefined', () => {
		(useQueryTableFilters as Mock).mockReturnValueOnce({
			queryFilters: { page: 1, limit: 5, sort: undefined, order: undefined },
			setSortingQuery: mockSetSortingQuery,
			setPageQuery: mockSetPageQuery,
		});

		const { result } = renderHook(() => useTracksListController());
		expect(result.current.tableSorting).toEqual([]);
	});

	it('calls setPageQuery with pageIndex + 1 in onPageChange', () => {
		const { result } = renderHook(() => useTracksListController());
		const pagination: PaginationState = { pageIndex: 3, pageSize: 10 };

		act(() => {
			result.current.onPageChange(pagination);
		});

		expect(mockSetPageQuery).toHaveBeenCalledWith(4);
	});

	it('adjusts page if queryFilters.page > totalPages', () => {
		(useQueryTableFilters as Mock).mockReturnValueOnce({
			queryFilters: { page: 10, limit: 10, sort: 'title', order: 'asc' },
			setSortingQuery: mockSetSortingQuery,
			setPageQuery: mockSetPageQuery,
		});

		(useTracks as Mock).mockReturnValueOnce({
			data: { data: [], meta: { totalPages: 5 } },
			isLoading: false,
			error: null,
		});

		renderHook(() => useTracksListController());

		expect(mockSetPageQuery).toHaveBeenCalledWith(5);
	});
});
