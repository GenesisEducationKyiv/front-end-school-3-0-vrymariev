'use client';
import { useGenres } from '@lib/hooks/fetchers/useFetchGenres';
import { useDebounce } from '@lib/hooks/useDebounce';
import { useQueryTableFilters } from '@lib/hooks/components/trackList/useQueryTableFilters';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import { useEffect, useState } from 'react';

const artists = ['Beyoncé', 'Drake', 'Harry Styles', 'Justin Bieber', 'Lady Gaga'];

export function Filters() {
	const { data: genresList, isLoading, error } = useGenres();
	const {queryFilters, setMetaQuery} = useQueryTableFilters();
	const [searchFilter, setSearchFilter] = useState<string>(queryFilters?.search || '');
	const debouncedSearch = useDebounce(searchFilter, 300);

	const onClearFiltersClicked = () => {
		setMetaQuery({ search: '', artist: '', genre: '' });
	};

	useEffect(() => {
		setMetaQuery({ search: debouncedSearch });
	}, [debouncedSearch]);

	if (isLoading) return <div className="text-gray-500">...Loading filters</div>;

	return (
		<div className="flex flex-col gap-2" data-loading="true">
			<h4 className="font-bold mb-2">Filters</h4>
			<div>
				<h4 className="font-semibold mb-1">Search</h4>
				<Input
					type="text"
					value={searchFilter}
					onChange={(event) => {
						setSearchFilter(event.target.value);
					}}
					data-testid="search-input"
				/>
			</div>

			<div>
				<h4 className="font-semibold mb-1">Filter by Artist</h4>
				<select
					value={queryFilters?.artist || ''}
					onChange={(event) => {
						setMetaQuery({ artist: event.target.value });
					}}
					className="w-full p-2 border rounded"
					data-testid="filter-artist"
				>
					<option value="">All Artists</option>
					{artists.map((artist) => (
						<option key={artist} value={artist}>
							{artist}
						</option>
					))}
				</select>
			</div>

			{genresList && !!genresList.length ? (
				<div>
					<h4 className="font-semibold mb-1">Filter by Genre</h4>
					<select
						value={queryFilters?.genre || ''}
						onChange={(event) => {
							setMetaQuery({ genre: event.target.value });
						}}
						className="w-full p-2 border rounded"
						data-testid="filter-genre"
					>
						<option value="">All Genres</option>
						{genresList.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
			) : null}

			<Button variant="outline" size="sm" onClick={onClearFiltersClicked}>
				Clear filters
			</Button>
		</div>
	);
}
