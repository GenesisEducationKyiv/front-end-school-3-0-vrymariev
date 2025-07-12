import { BaseError } from '@lib/errors/BaseError';

export type ErrorTypePrimitive = string | number | symbol;

export class ApplicationError<TErrorType extends ErrorTypePrimitive = ErrorTypePrimitive> extends BaseError {
	public type: TErrorType;
	public cause: unknown;

	constructor(
		...args:
			| [TErrorType]
			| [TErrorType, Record<string, unknown> | undefined]
			| [TErrorType, string, Record<string, unknown> | undefined]
	) {
		if (args.length === 3) {
			const [type, message, details] = args;
			super(message, details);
			this.type = type;
		} else {
			const [type, details] = args;
			super('', details);
			this.type = type;
		}
		this.name = `ApplicationError[${String(this.type)}]`;
	}

	is<TErrorTypeCase extends TErrorType = TErrorType>(
		type: TErrorTypeCase | TErrorTypeCase[] | Record<string, TErrorTypeCase>,
	): this is ApplicationError<TErrorTypeCase> {
		if (typeof type === 'string' || typeof type === 'symbol' || typeof type === 'number') {
			return this.type === type;
		}

		if (Array.isArray(type)) {
			return type.some((t) => t === this.type);
		}

		if (typeof type === 'object') {
			return Object.values(type).some((t) => t === this.type);
		}

		return false;
	}

	unwrap(): unknown {
		return this.cause;
	}

	static override is(this: void, error: unknown): error is ApplicationError {
		if (error == null || typeof error !== 'object') {
			return false;
		}

		if (error instanceof ApplicationError) {
			return true;
		}

		if (!BaseError.is(error)) {
			return false;
		}

		return (
			'type' in error &&
			(typeof error.type === 'string' || typeof error.type === 'number' || typeof error.type === 'symbol')
		);
	}

	static isOfType<TErrorType extends ErrorTypePrimitive>(
		this: void,
		errorType: TErrorType | TErrorType[] | Record<string, TErrorType>,
		error: unknown,
	): error is ApplicationError<TErrorType> {
		if (!ApplicationError.is(error)) {
			return false;
		}

		if (typeof errorType === 'string' || typeof errorType === 'symbol' || typeof errorType === 'number') {
			return error.type === errorType;
		} else if (Array.isArray(errorType)) {
			return errorType.some((type) => type === error.type);
		} else if (typeof errorType === 'object') {
			return Object.values(errorType).some((type) => type === error.type);
		}

		return false;
	}

	static override wrap<TErrorType extends ErrorTypePrimitive>(
		this: void,
		error: unknown,
		type: TErrorType,
		details?: Record<string, unknown>,
	): ApplicationError<TErrorType> {
		const baseError = BaseError.from(error);
		const applicationError = new ApplicationError(
			type,
			baseError.message,
			baseError.details ? { ...baseError.details, ...details } : details,
		);
		applicationError.cause = error;
		applicationError.stack = baseError.stack;
		return applicationError;
	}
}
