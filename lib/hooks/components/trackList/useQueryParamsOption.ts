'use client';
import { useSearchParams } from 'next/navigation';
import { O, pipe } from '@mobily/ts-belt';
import {
	TracksRequestQueryParams,
	TracksTableOrder,
	tracksTableOrderSchema,
	TracksTableSorting,
	tracksTableSortingSchema,
} from '@models/zod/track.table.schema';
import { useMemo, useState } from 'react';

export const useQueryParamsOption = () => {
	const searchParams = useSearchParams();
	const [queryParams, setQueryParams] = useState<TracksRequestQueryParams>({});

	useMemo(() => {
		const get = (key: string) => O.fromNullable(searchParams.get(key)?.trim());

		const page = pipe(
			get('page'),
			O.map((v) => parseInt(v, 10)),
			O.filter((n) => Number.isInteger(n) && n > 0),
			O.getWithDefault<number>(1),
		);

		const limit = pipe(
			get('limit'),
			O.map((v) => parseInt(v, 10)),
			O.filter((n) => Number.isInteger(n) && n > 0),
			O.getWithDefault<number>(10),
		);

		const search = pipe(get('search'), O.getWithDefault<string>(''));

		const genre = pipe(
			get('genre'),
			O.filter((s) => s.length > 0),
			O.toUndefined,
		);

		const artist = pipe(
			get('artist'),
			O.filter((s) => s.length > 0),
			O.toUndefined,
		);

		const sort = pipe(
			get('sort'),
			O.flatMap((s) => (tracksTableSortingSchema.safeParse(s).success ? O.Some(s as TracksTableSorting) : O.None)),
			O.toUndefined,
		);

		const order = pipe(
			get('order'),
			O.flatMap((s) => (tracksTableOrderSchema.safeParse(s).success ? O.Some(s as TracksTableOrder) : O.None)),
			O.toUndefined,
		);

		setQueryParams({
			page,
			limit,
			search,
			genre,
			artist,
			sort,
			order,
		});
	}, [searchParams]);

	return { queryParams };
};
