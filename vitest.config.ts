import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		exclude: [
			'tests/e2e/**',
			'node_modules',
			'dist',
			'.next',
		],
	},
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'lib/api'),
			'@lib': path.resolve(__dirname, 'lib'),
			'@ui': path.resolve(__dirname, 'components/ui'),
			'@components': path.resolve(__dirname, 'components'),
			'@context': path.resolve(__dirname, 'context'),
			'@models': path.resolve(__dirname, 'models'),
		},
	},
});
