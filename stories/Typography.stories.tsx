import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
	title: 'Design/Typography',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Overview: Story = {
	render: () => (
		<div className="p-10 space-y-8 bg-white dark:bg-black text-black dark:text-white">
			<section>
				<h1 className="text-4xl font-bold">Geist Sans — Headings</h1>
				<p className="text-sm text-muted-foreground mt-2">Primary font for UI</p>
			</section>

			<section className="space-y-2">
				<p className="text-xs">text-xs</p>
				<p className="text-sm">text-sm</p>
				<p className="text-base">text-base</p>
				<p className="text-lg">text-lg</p>
				<p className="text-xl">text-xl</p>
				<p className="text-2xl">text-2xl</p>
				<p className="text-3xl">text-3xl</p>
				<p className="text-4xl">text-4xl</p>
				<p className="text-5xl">text-5xl</p>
			</section>

			<section className="space-y-2">
				<p className="font-light">font-light</p>
				<p className="font-normal">font-normal</p>
				<p className="font-medium">font-medium</p>
				<p className="font-semibold">font-semibold</p>
				<p className="font-bold">font-bold</p>
			</section>

			<section className="space-y-2">
				<p className="text-muted-foreground">Muted foreground</p>
				<p className="text-destructive">Destructive</p>
				<p className="text-primary">Primary</p>
				<p className="text-secondary">Secondary</p>
				<p className="text-accent">Accent</p>
			</section>
		</div>
	),
};
