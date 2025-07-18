
import { validateFile } from '@lib/utils/fileUtills';
import { describe, it, expect } from 'vitest';

describe('validateFileDrop - blackbox test', () => {
	it('returns ok with valid file under size limit', () => {
		const validFile = { name: 'test.txt', size: 1024 * 1024 } as File; // 1MB
		const result = validateFile([validFile]);

		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(validFile);
	});

	it('returns error when file is too big', () => {
		const largeFile = { name: 'big.txt', size: 11 * 1024 * 1024 } as File; // 11MB
		const result = validateFile([largeFile]);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr()).toEqual(new Error('File is too big'));
	});

	it('returns error when no file provided', () => {
		const result = validateFile([]);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr()).toEqual(new Error('No file provided'));
	});
});