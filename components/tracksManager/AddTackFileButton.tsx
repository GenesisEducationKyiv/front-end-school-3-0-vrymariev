'use client';
import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { FilePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import Dropzone from 'react-dropzone';
import { toast } from 'sonner';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useUploadTrackFileMutation } from '@lib/hooks/mutations/useUploadTrackFileMutation';
import { validateFile } from '@lib/utils/fileUtills';

type DeleteTrackButtonProps = {
	id: string;
};

export const AddTackFileButton: React.FC<DeleteTrackButtonProps> = ({ id }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [file, setFile] = useState<File>();

	const { mutateAsync } = useUploadTrackFileMutation({
		id,
		onSuccess: () => {
			toast.success('Done!', { id });
			setDialogOpen(false);
		},
	});

	const handleConfirm = useCallback(async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('files', file);

		const result = await tryCatch(() => mutateAsync(formData));
		if (result.isErr()) {
			toast.error('Server error! Check console.');
		}
	}, [id, file]);

	const handleDrop = (acceptedFiles: File[]) => {
		const result = validateFile(acceptedFiles);

		if (result.isErr()) {
			toast.error(result.error.message);
			return;
		}

		setFile(result.value);
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
									data-testid="dropzone-add-file"
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
							data-testid="confirm-add-file"
						>
							Add
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
