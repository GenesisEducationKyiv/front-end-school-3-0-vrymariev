'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { toast } from 'sonner';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useDeleteTrackFileMutation } from '@lib/hooks/mutations/useDeleteTrackFileMutation';

type DeleteTrackButtonProps = {
	id: string;
	fileName: string;
};

export const DeleteTrackFileButton: React.FC<DeleteTrackButtonProps> = ({ id, fileName }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const { mutateAsync } = useDeleteTrackFileMutation({
		id,
		onSuccess: () => {
			toast.success('Success!');
			setDialogOpen(false);
		},
	});

	const handleConfirm = async () => {
		const deleteResult = await tryCatch(() => mutateAsync());
		if (deleteResult.isErr()) {
			toast.error('Failed to delete track');
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
				data-testid={`delete-file-${id}`}
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
						<Button className="cursor-pointer" variant="destructive" onClick={handleConfirm} data-testid="confirm-delete-file">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
