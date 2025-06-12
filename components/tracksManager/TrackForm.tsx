'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@ui/Input';
import { Button } from '@ui/Button';
import { useGenres } from '@lib/hooks/fetchers/useFetchGenres';
import { TrackFormValues, trackFormValueSchema } from '@models/zod/track.table.schema';
import { tryCatchSync } from '@lib/neverthrowUtils';

interface TrackFormProps {
	defaultValues?: Partial<TrackFormValues>;
	onSubmit: (data: TrackFormValues) => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ defaultValues, onSubmit }) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TrackFormValues>({
		resolver: zodResolver(trackFormValueSchema),
		defaultValues: {
			title: '',
			artist: '',
			album: '',
			genres: [],
			coverImage: '',
			...defaultValues,
		},
	});

	const { data: availableGenres = [], isLoading, error } = useGenres();

	const genres = watch('genres');
	const coverImage = watch('coverImage');

	useEffect(() => {
		if (defaultValues) reset(defaultValues);
	}, [defaultValues, reset]);

	const handleAddGenre = (genre: string) => {
		if (!genres.includes(genre)) {
			setValue('genres', [...genres, genre]);
		}
	};

	const handleRemoveGenre = (genre: string) => {
		setValue(
			'genres',
			genres.filter((g) => g !== genre),
		);
	};
	const isValidUrl = (value: unknown): value is string => {
		if (typeof value !== 'string' || value.trim() === '') return false;

		const result = tryCatchSync(() => new URL(value));
		return result.isOk();
	};

	const unselectedGenres = availableGenres.filter((g) => !genres.includes(g));

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="track-form">
			{/* Title Input */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
				<Input placeholder="Title" {...register('title')} data-testid="input-title" />
				{errors.title && (
					<p className="text-sm text-red-500" data-testid="error-title">
						{errors.title.message}
					</p>
				)}
			</div>

			{/* Artist Input */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
				<Input placeholder="Artist" {...register('artist')} data-testid="input-artist" />
				{errors.artist && (
					<p className="text-sm text-red-500" data-testid="error-artist">
						{errors.artist.message}
					</p>
				)}
			</div>

			{/* Album Input */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1" data-testid="input-album">
					Album
				</label>
				<Input placeholder="Album (optional)" {...register('album')} />
			</div>

			{/* Cover Image Input */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
				<Input placeholder="Cover Image URL (optional)" {...register('coverImage')} data-testid="input-cover-image" />
				{errors.coverImage && <p className="text-sm text-red-500">{errors.coverImage.message}</p>}
				<div>
					<p className="text-sm text-muted-foreground mb-1">Preview</p>
					<img
						src={isValidUrl(coverImage) ? coverImage : '/placeholder.png'}
						alt="Cover preview"
						className="h-40 w-40 object-cover rounded border"
					/>
				</div>
			</div>

			{/* Genres Select */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Genres</label>
				<div className="flex flex-wrap gap-2 mb-2">
					{genres.map((genre) => (
						<span
							key={genre}
							className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
						>
							{genre}
							<button
								type="button"
								onClick={() => handleRemoveGenre(genre)}
								className="text-blue-500 hover:text-blue-700"
							>
								×
							</button>
						</span>
					))}
				</div>

				{isLoading ? (
					<p className="text-sm text-gray-500">Loading genres...</p>
				) : error ? (
					<p className="text-sm text-red-500">Failed to load genres</p>
				) : (
					<div>
						<select
							className="w-full p-2 border rounded-md"
							onChange={(e) => handleAddGenre(e.target.value)}
							defaultValue=""
							data-testid="genre-selector"
						>
							<option value="" disabled>
								Select a genre
							</option>
							{unselectedGenres.map((genre) => (
								<option key={genre} value={genre}>
									{genre}
								</option>
							))}
						</select>
					</div>
				)}

				{errors.genres && (
					<p className="text-sm text-red-500" data-testid="error-genre">
						{errors.genres.message}
					</p>
				)}
			</div>

			{/* Submit Button */}
			<Button className="w-full cursor-pointer" type="submit" data-testid="submit-button">
				Save
			</Button>
		</form>
	);
};

export default TrackForm;
