import TrackForm from '@components/tracksManager/TrackForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('TrackForm - blackbox integration test', () => {
	it('shows validation errors on empty submit', async () => {
		const queryClient = new QueryClient();

		render(
			<QueryClientProvider client={queryClient}>
				<TrackForm onSubmit={vi.fn()} />
			</QueryClientProvider>,
		);

		fireEvent.click(screen.getByTestId('submit-button'));

		expect(await screen.findByTestId('error-title')).toBeDefined();
		expect(await screen.findByTestId('error-artist')).toBeDefined();
	});
});
