'use client';
import { useState } from 'react';
import { FilePlus } from 'lucide-react';
import { Button } from '@ui/Button';
import dynamic from 'next/dynamic';

const AddTackFileModal = dynamic(
	() => import('@components/tracksManager/AddTackFileModal').then((mod) => mod.AddTackFileModal),
	{
		ssr: false,
		loading: () => null,
	},
);

type DeleteTrackButtonProps = {
	id: string;
};

export const AddTackFileButton: React.FC<DeleteTrackButtonProps> = ({ id }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);

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

			{isDialogOpen && <AddTackFileModal id={id} isDialogOpen={isDialogOpen} onOpenChanged={setDialogOpen} />}
		</>
	);
};
