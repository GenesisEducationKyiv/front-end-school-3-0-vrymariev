import { ApiStrategy } from '@lib/constants/apiStrategy';

const raw = process.env.NEXT_PUBLIC_API_STRATEGY;

export const API_STRATEGY: ApiStrategy = raw === 'grpc' ? ApiStrategy.GRPC : ApiStrategy.REST;
