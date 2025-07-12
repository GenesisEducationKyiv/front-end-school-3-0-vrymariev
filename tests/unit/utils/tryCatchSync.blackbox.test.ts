import { tryCatchSync } from '../../../lib/utils/neverthrowUtils';
import { describe, it, expect } from 'vitest';

describe('tryCatchSync - blackbox test', () => {
	it('returns value when no error thrown', () => {
		const fn = () => 123;
		const result = tryCatchSync(fn);
		expect(result).toEqual({ value: 123 });
	});

	it('returns error when exception thrown', () => {
		const fn = () => {
			throw new Error('fail');
		};
		const result = tryCatchSync(fn);
		expect(result).toEqual({ error: new Error('fail') });
	});
});
