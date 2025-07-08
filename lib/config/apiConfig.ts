import { ApiStrategy } from '@lib/constants/apiStrategy';

export const API_STRATEGY: ApiStrategy = process.env.NEXT_PUBLIC_API_STRATEGY === 'grpc' ? ApiStrategy.GRPC : ApiStrategy.REST;
