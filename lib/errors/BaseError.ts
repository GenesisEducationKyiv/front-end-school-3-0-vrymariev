function hasMessage<TError extends NonNullable<unknown>>(error: TError): error is TError & { message: string } {
	return 'message' in error && typeof error.message === 'string';
}

export class BaseError extends Error {
	constructor(message: string, public details?: Record<string, unknown>) {
		super(message);
		this.name = this.constructor.name;
	}

	/**
	 * Checks if the provided error is an instance of BaseError or has the required properties.
	 *
	 * @param error - The error to check.
	 * @returns True if the error is an instance of BaseError or has the required properties, false otherwise.
	 */
	static is(this: void, error: unknown): error is BaseError {
		if (error == null || typeof error !== 'object') {
			return false;
		}
		if (error instanceof BaseError) {
			return true;
		}
		return 'message' in error && typeof error.message === 'string' && 'stack' in error && 'details' in error;
	}

	/**
	 * Convert any error to BaseError saving as much information as possible (original context/stack included)
	 *
	 * Should be used for error handling.
	 *
	 * @param error - The error to convert
	 * @returns BaseError instance
	 */
	static from(this: void, error: unknown): BaseError {
		if (error == null) {
			return new BaseError('Unknown error');
		}
		if (error instanceof BaseError) {
			return error;
		}
		if (error instanceof Error) {
			const baseError = new BaseError(error.message);
			baseError.stack = error.stack;
			return baseError;
		}
		if (typeof error !== 'object') {
			return new BaseError(String(error));
		}
		if (hasMessage(error)) {
			return new BaseError(error.message);
		}
		return new BaseError(JSON.stringify(error));
	}

	/**
	 * Wrap any error to add more information to message and details. Original stack is preserved.
	 *
	 * Should be used for rethrowing errors.
	 *
	 * @param error - The error to wrap
	 * @param message - The message to prepend to the error message
	 * @param details - Additional details to include in the error
	 * @returns BaseError instance
	 */
	static wrap(this: void, error: unknown, message: string, details?: Record<string, unknown>): BaseError {
		const originalError = BaseError.from(error);
		const baseError = new BaseError(`${message}: ${originalError.message}`, {
			...originalError.details,
			...details,
		});
		baseError.stack = originalError.stack;
		return baseError;
	}
}
