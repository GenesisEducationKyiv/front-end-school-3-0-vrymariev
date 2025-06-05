'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTrackFile } from '@api/resources/Tracks';
import { toast } from 'sonner';
import { tryCatch } from '@lib/neverthrowUtils';

type DeleteTrackButtonProps = {
	id: string;
	fileName: string;
};

export const DeleteTrackFileButton: React.FC<DeleteTrackButtonProps> = ({ id, fileName }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleConfirm = async () => {
		const deleteResult = await tryCatch(() => deleteTrackFile(id));
		if (deleteResult.isErr()) {
			console.error('Error on DeleteTrackFileButton:', deleteResult.error);
			toast.error('Failed to delete track file');
			return;
		}

		const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));
		if (invalidateResult.isErr()) {
			console.warn('Track file deleted, but cache invalidation failed:', invalidateResult.error);
			toast.warning('File deleted, but list not updated');
		}

		toast.success('Success!');
		setDialogOpen(false);
	};

	return (
		<>
			<Button
				className="cursor-pointer"
				variant="destructive"
				size="icon"
				onClick={() => setDialogOpen(true)}
				title="Delete track file"
			>
				<Trash2 className="w-4 h-4 cursor-pointer" />
			</Button>

			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete track file</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">
						Are you sure you want to delete <strong>{fileName}</strong>?
					</p>
					<DialogFooter className="flex justify-end gap-2 pt-4 ">
						<Button className="cursor-pointer" variant="outline" onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button className="cursor-pointer" variant="destructive" onClick={handleConfirm}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
