import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@ui/Button";
import { ArrowUpDown } from "lucide-react";
import { AddTackFileButton } from "../AddTackFileButton";
import { DeleteTrackFileButton } from "../DeleteTrackFileButton";
import moment from "moment";
import { DeleteTrackButton } from "../DeleteTrackButton";
import { Track } from "@models/track/track";

export function getTrackColumns(openModal: (track: Track) => void): ColumnDef<Track, any>[] {
	const columnHelper = createColumnHelper<Track>();
	return [
		columnHelper.accessor((row) => row, {
			id: 'coverImage',
			header: 'Image',
			cell: ({ getValue }) => {
				const track = getValue();
				const id = track.id;

				const coverImage = track.coverImage;
				return (
					<img
						src={!!coverImage ? coverImage : '/placeholder.png'}
						alt="Cover preview"
						className="h-15 w-15 object-cover rounded border"
					/>
				);
			},
		}),
		columnHelper.accessor((row) => row, {
			id: 'title',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						data-testid="sort-select"
					>
						Title
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ getValue }) => {
				const track = getValue();
				const id = track.id;

				const value = track.title;
				return <div data-testid={`track-item-${id}-title`}>{value}</div>;
			},
		}),

		columnHelper.accessor((row) => row, {
			id: 'artist',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						data-testid="sort-select"
					>
						Artist
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ getValue }) => {
				const track = getValue();
				const id = track.id;

				const value = track.artist;
				return <div data-testid={`track-item-${id}-artist`}>{value}</div>;
			},
		}),
		columnHelper.accessor((row) => row, {
			id: 'album',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						data-testid="sort-select"
					>
						Album
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ getValue }) => {
				const track = getValue();
				const value = track.album;
				return <div>{value}</div>;
			},
		}),

		columnHelper.accessor((row) => row, {
			id: 'genres',
			header: 'Genres',
			cell: ({ getValue }) => {
				const track = getValue();
				const genres = track.genres;
				return (
					<div className="flex flex-col">
						{genres.map((genre: string, index: number) => (
							<div className="text-center" key={index}>
								{genre}
							</div>
						))}
					</div>
				);
			},
		}),
		columnHelper.accessor((row) => row, {
			id: 'audioFile',
			header: 'Track',
			cell: ({ getValue }) => {
				const track = getValue();
				const fileName = track.audioFile;
				if (!fileName) return <AddTackFileButton id={track.id} />;
				return (
					<div className="flex items-center gap-2">
						<audio controls className="w-full" style={{ width: '300px' }} data-testid="audio-player-{id}">
							<source src={`http://localhost:8000/api/files/${fileName}`} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
						<DeleteTrackFileButton id={track.id} fileName={fileName} />
					</div>
				);
			},
		}),
		columnHelper.accessor((row) => row, {
			id: 'createdAt',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						data-testid="sort-select"
					>
						Created
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ getValue }) => {
				const track = getValue();
				return moment(track.createdAt).format('DD.MM.YYYY');
			},
		}),
		columnHelper.accessor((row) => row, {
			id: 'actions',
			header: 'Actions',
			cell: ({ getValue }) => {
				const track = getValue();
				const id = track.id;
				return (
					<div className="flex gap-2">
						<Button className="cursor-pointer" onClick={() => openModal(track)} data-testid={`edit-track-${id}`}>
							Edit
						</Button>
						<DeleteTrackButton id={track.id} title={track.title} data-testid={`delete-track-${id}`} />
					</div>
				);
			},
		}),
	];
}