'use client';
import { Track } from '@models/zod/track.schema';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	PaginationState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { Button } from '@ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/Table';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	sorting?: SortingState;
	onSortingChanged?: (sorting: SortingState) => void;
	pagination: PaginationState;
	onPaginationChange?: (pagination: PaginationState) => void;
	pageCount?: number;
	rowCount?: number;
}

export function DataTable<TData extends Track, TValue>({
	columns,
	data,
	sorting,
	onSortingChanged,
	pagination,
	onPaginationChange,
	pageCount,
	rowCount,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: (updater) => {
			const nextSorting = typeof updater === 'function' ? updater(sorting ?? []) : updater;
			onSortingChanged?.(nextSorting);
		},
		state: {
			sorting,
			pagination,
		},
		enableMultiSort: false,
		pageCount: pageCount,
		rowCount: rowCount,
	});

	return (
		<div className="rounded-md border flex flex-col flex-auto" data-loading="true">
			<div className="flex-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => 
								{
									const customId = row.original?.id;
									return <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} data-testid={`track-row-${customId}`}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
								}
								
							)
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 p-5">
				<div className="flex-1 text-sm text-muted-foreground">
					Show {table.getFilteredRowModel().rows.length} from {table.getRowCount()}
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							onPaginationChange?.({
								...pagination,
								pageIndex: pagination.pageIndex - 1,
							})
						}
						disabled={!table.getCanPreviousPage()}
						data-testid="pagination-prev"
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							onPaginationChange?.({
								...pagination,
								pageIndex: pagination.pageIndex + 1,
							})
						}
						disabled={!table.getCanNextPage()}
						data-testid="pagination-next"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
