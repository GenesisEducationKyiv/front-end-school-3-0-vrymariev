'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTrackFile } from '@api/resources/Tracks';
import { toast } from 'sonner';

type DeleteTrackButtonProps = {
	id: string;
	fileName: string;
};

export const DeleteTrackFileButton: React.FC<DeleteTrackButtonProps> = ({ id, fileName }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleConfirm = async () => {
		try {
			await deleteTrackFile(id);
			await queryClient.invalidateQueries({ queryKey: ['tracks'] });
			toast.success('Success!');
			setDialogOpen(false);
		} catch (error) {
			console.error('Error on DeleteTrackFileButton: ', error);
			toast.error('Server error! Check console.');
		}
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
