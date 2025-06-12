'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { toast } from 'sonner';
import { tryCatch } from '@lib/neverthrowUtils';
import { useDeleteTrack } from '@lib/hooks/mutations/useDeleteTrack';

type DeleteTrackButtonProps = {
	id: string;
	title: string;
};

export const DeleteTrackButton: React.FC<DeleteTrackButtonProps> = ({ id, title }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const { mutateAsync } = useDeleteTrack({
		onSuccess: () => {
			toast.success('Success!');
			setDialogOpen(false);
		},
	});

	const handleConfirm = async () => {
		const deleteResult = await tryCatch(() => mutateAsync(id));
		if (deleteResult.isErr()) {
			toast.error('Failed to delete track');
		}
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
