'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTrack } from '@api/resources/Tracks';
import { toast } from 'sonner';

type DeleteTrackButtonProps = {
	id: string;
	title: string;
};

export const DeleteTrackButton: React.FC<DeleteTrackButtonProps> = ({ id, title }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleConfirm = async () => {
		try {
			await deleteTrack(id);
			await queryClient.invalidateQueries({ queryKey: ['tracks'] });
			toast.success('Success!');
			setDialogOpen(false);
		} catch (error) {
			console.error('Error on DeleteTrackButton: ', error);
			toast.error('Server error! Check console.');
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
