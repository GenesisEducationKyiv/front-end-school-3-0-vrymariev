import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@ui/Input';

const meta = {
	title: 'UI/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: {
			control: 'text',
			defaultValue: 'text',
		},
		placeholder: {
			control: 'text',
			defaultValue: 'Enter something...',
		},
		disabled: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: 'text',
		placeholder: 'Search...',
	},
};

export const Password: Story = {
	args: {
		type: 'password',
		placeholder: 'Enter password',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled input',
	},
};
