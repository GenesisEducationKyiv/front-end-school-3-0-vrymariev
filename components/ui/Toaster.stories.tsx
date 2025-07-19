import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toaster } from '@ui/Sonner';
import { toast } from 'sonner';
import { Button } from '@ui/Button'; // your custom Button
import { useState } from 'react';

const meta = {
	title: 'UI/Toaster',
	component: Toaster,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToasterTriggerDemo = () => {
	const [count, setCount] = useState(1);

	const showToast = () => {
		toast.success(`Toast #${count}`, {
			description: `This is message number ${count}`,
		});
		setCount((c) => c + 1);
	};

	return (
		<>
			<Button onClick={showToast}>Show toast</Button>
			<Toaster richColors position="bottom-right" />
		</>
	);
};

export const Triggered: Story = {
	render: () => (
		<div style={{ height: '300px', padding: 32 }}>
			<ToasterTriggerDemo />
		</div>
	),
};
