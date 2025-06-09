'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTrack } from '@api/resources/Tracks';
import { toast } from 'sonner';
import { tryCatch } from '@lib/neverthrowUtils';

type DeleteTrackButtonProps = {
	id: string;
	title: string;
};

export const DeleteTrackButton: React.FC<DeleteTrackButtonProps> = ({ id, title }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleConfirm = async () => {
		const deleteResult = await tryCatch(() => deleteTrack(id));
		if (deleteResult.isErr()) {
			console.error('Error on DeleteTrackButton:', deleteResult.error);
			toast.error('Failed to delete track');
			return;
		}

		const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));
		if (invalidateResult.isErr()) {
			console.warn('Warning: failed to refresh track list:', invalidateResult.error);
			toast.warning('Track deleted, but refresh failed');
		}

		toast.success('Success!');
		setDialogOpen(false);
	};

	return (
		<>
			<Button className="cursor-pointer" variant="destructive" size="icon" onClick={() => setDialogOpen(true)}>
				<Trash2 className="w-4 h-4 cursor-pointer" />
			</Button>

			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-md" data-testid="confirm-dialog">
					<DialogHeader>
						<DialogTitle>Delete track</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">
						Are you sure you want to delete <strong>{title}</strong>?
					</p>
					<DialogFooter className="flex justify-end gap-2 pt-4 ">
						<Button
							className="cursor-pointer"
							variant="outline"
							onClick={() => setDialogOpen(false)}
							data-testid="cancel-delete"
						>
							Cancel
						</Button>
						<Button
							className="cursor-pointer"
							variant="destructive"
							onClick={handleConfirm}
							data-testid="confirm-delete"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
