import { err, ok, Result } from 'neverthrow';

export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
	try {
		const result = await fn();
		return ok(result);
	} catch (e) {
		return err(e instanceof Error ? e : new Error('Unknown error'));
	}
}

export function tryCatchSync<T>(fn: () => T): Result<T, Error> {
	try {
		return ok(fn());
	} catch (e) {
		return err(e instanceof Error ? e : new Error('Unknown error'));
	}
}
