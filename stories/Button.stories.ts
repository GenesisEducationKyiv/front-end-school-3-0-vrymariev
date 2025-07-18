import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@ui/Button';
import { fn } from 'storybook/test';

const meta = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},
		size: {
			control: 'select',
			options: ['sm', 'default', 'lg', 'icon'],
		},
		onClick: { action: 'clicked' },
		children: {
			control: 'text',
		},
	},
	args: {
		onClick: fn(),
		children: 'Click me',
		variant: 'default',
		size: 'default',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: 'default',
		children: 'Primary',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: 'Delete',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Outline',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary',
	},
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		children: 'Ghost',
	},
};

export const Link: Story = {
	args: {
		variant: 'link',
		children: 'Learn more',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Small',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Large',
	},
};

export const Icon: Story = {
	args: {
		size: 'icon',
		children: '🔍',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: 'Disabled',
	},
};
