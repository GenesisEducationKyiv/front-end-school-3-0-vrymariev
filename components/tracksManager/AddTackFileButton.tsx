'use client';
import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { FilePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { uploadTrackFile } from '@api/resources/Tracks';
import Dropzone from 'react-dropzone';
import { toast } from 'sonner';
import { tryCatch } from '@lib/neverthrowUtils';

type DeleteTrackButtonProps = {
	id: string;
};

export const AddTackFileButton: React.FC<DeleteTrackButtonProps> = ({ id }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [file, setFile] = useState<File>();
	const queryClient = useQueryClient();

	const handleConfirm = useCallback(async () => {
		if (file === undefined) return;

		const formData = new FormData();
		formData.append('files', file);

		const result = await tryCatch(() => uploadTrackFile(id, formData));

		if (result.isErr()) {
			console.error('Error on AddTrackFileButton:', result.error);
			toast.error('Server error! Check console.');
			return;
		}

		await queryClient.invalidateQueries({ queryKey: ['tracks'] });
		toast.success('Done!', { id });
		setDialogOpen(false);
	}, [id, file]);

	const handleDrop = (acceptedFiles: File[]) => {
		const newFile = acceptedFiles[0];

		if (newFile.size > 10 * 1024 * 1024) {
			toast.error('File is too big');
			return;
		}

		setFile(newFile);
	};

	const handleDropError = (error: Error) => {
		console.error('File add error', error);
		toast.error(`File add error. ${error}`);
	};

	return (
		<>
			<Button
				className="cursor-pointer"
				variant="secondary"
				size="icon"
				onClick={() => setDialogOpen(true)}
				data-testid={`upload-track-${id}`}
			>
				<FilePlus className="w-4 h-4 cursor-pointer" />
			</Button>

			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Add track file</DialogTitle>
					</DialogHeader>

					{file ? (
						<div className="grid grid-cols-3 gap-2">
							<div className="relative border p-2 rounded text-sm bg-muted">
								<div className="truncate">{file.name}</div>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									className="absolute top-1 right-1"
									onClick={() => setFile(undefined)}
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						</div>
					) : (
						<Dropzone
							accept={{
								'audio/*': [],
							}}
							onDrop={handleDrop}
							onError={handleDropError}
							maxFiles={1}
							multiple={false}
						>
							{({ getRootProps, getInputProps }) => (
								<div
									{...getRootProps()}
									className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer"
								>
									<input {...getInputProps()} />
									<p className="text-sm text-gray-500">Drag & drop files here, or click to select</p>
								</div>
							)}
						</Dropzone>
					)}

					<DialogFooter className="flex justify-end gap-2 pt-4 ">
						<Button className="cursor-pointer" variant="outline" onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							className="cursor-pointer"
							variant="destructive"
							onClick={handleConfirm}
							disabled={file === undefined}
						>
							Add
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
