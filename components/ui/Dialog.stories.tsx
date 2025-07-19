import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog';
import { Button } from '@ui/Button';
import { fn } from 'storybook/test';

const meta = {
	title: 'UI/Dialog',
	component: Dialog,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogStory = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open dialog</Button>

			<Dialog
				open={open}
				onOpenChange={(v) => {
					fn()(v);
					setOpen(v);
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="mb-3">Create new track</DialogTitle>
						<div className="space-y-2 text-sm text-muted-foreground">
							This is where the track creation form will appear. You can place any JSX content here.
						</div>
						<div className="mt-6 flex justify-end gap-2">
							<Button variant="secondary" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setOpen(false)}>Save</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

export const Default: Story = {
	render: () => <DialogStory />,
};
