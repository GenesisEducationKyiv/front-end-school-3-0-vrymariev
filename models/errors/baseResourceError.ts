export const BaseResourceError = {
	InvalidResponse: 'base_invalid_response',
	NetworkError: 'base_network_error',
} as const;

export type BaseResourceErrorType = (typeof BaseResourceError)[keyof typeof BaseResourceError];
