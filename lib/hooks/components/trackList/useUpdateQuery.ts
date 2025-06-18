'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';

type QueryUpdateInput = Record<string, string | number | boolean | null | undefined>;

export const useUpdateQuery = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateQuery = useCallback(
		(updates: QueryUpdateInput) => {
			const currentQuery = queryString.parse(searchParams.toString());

			const merged = {
				...currentQuery,
				...updates,
			};

			Object.keys(merged).forEach((key) => {
				if (merged[key] === null || merged[key] === undefined) {
					delete merged[key];
				}
			});

			const newUrl = queryString.stringifyUrl(
				{ url: pathname, query: merged },
				{ skipNull: true, skipEmptyString: true },
			);

			router.push(newUrl, { scroll: false });
		},
		[router, pathname, searchParams],
	);

	return updateQuery;
};
