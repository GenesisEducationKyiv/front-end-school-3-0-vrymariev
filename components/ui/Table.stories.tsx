import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
} from '@ui/Table';

const meta = {
	title: 'UI/Table',
	component: Table,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>Table example</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Anna</TableCell>
					<TableCell>anna@example.com</TableCell>
					<TableCell>Active</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Ihor</TableCell>
					<TableCell>ihor@example.com</TableCell>
					<TableCell>Inactive</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>2 records</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};
