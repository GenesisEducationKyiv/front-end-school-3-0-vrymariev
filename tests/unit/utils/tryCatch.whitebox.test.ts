import { tryCatch } from '@lib/utils/neverthrowUtils';
import { describe, expect, it, vi } from 'vitest';

describe('tryCatch - whitebox test', () => {
	it('returns ok if async function resolves', async () => {
		const fn = vi.fn().mockResolvedValue('hello');
		const result = await tryCatch(fn);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('hello');
	});

	it('returns err if async function rejects', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('fail'));
		const result = await tryCatch(fn);
		expect(result.isErr()).toBe(true);
	});
});
