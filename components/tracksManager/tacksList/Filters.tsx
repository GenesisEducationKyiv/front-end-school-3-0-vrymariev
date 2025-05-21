'use client';
import { useGenres } from '@lib/hooks/fetchers/useFetchGenres';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

const artists = ['Beyoncé', 'Drake', 'Harry Styles', 'Justin Bieber', 'Lady Gaga'];

type Props = {
	search: string;
	onSearchChanged: (value: string) => void;
	artistFilter?: string;
	onArtistFilterChanged: (value?: string) => void;
	genreFilter?: string;
	onGenreFilterChanged: (value?: string) => void;
};

export function Filters({
	search,
	onSearchChanged,
	artistFilter,
	onArtistFilterChanged,
	genreFilter,
	onGenreFilterChanged,
}: Props) {
	const { data: genres, isLoading, error } = useGenres();

	const onClearFiltersClicked = () => {
		onSearchChanged('');
		onArtistFilterChanged('');
		onGenreFilterChanged('');
	};

	if (isLoading) return <div className="text-gray-500">...Loading filters</div>;

	return (
		<div className="flex flex-col gap-2" data-loading="true">
			<h4 className="font-bold mb-2">Filters</h4>
			<div>
				<h4 className="font-semibold mb-1">Search</h4>
				<Input
					type="text"
					value={search}
					onChange={(event) => {
						onSearchChanged(event.target.value);
					}}
					data-testid="search-input"
				/>
			</div>

			<div>
				<h4 className="font-semibold mb-1">Filter by Artist</h4>
				<select
					value={artistFilter || ''}
					onChange={(e) => onArtistFilterChanged(e.target.value || undefined)}
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

			{genres && !!genres.length ? (
				<div>
					<h4 className="font-semibold mb-1">Filter by Genre</h4>
					<select
						value={genreFilter || ''}
						onChange={(e) => onGenreFilterChanged(e.target.value || undefined)}
						className="w-full p-2 border rounded"
						data-testid="filter-genre"
					>
						<option value="">All Genres</option>
						{genres.map((genre) => (
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
