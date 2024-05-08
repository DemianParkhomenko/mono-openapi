import createClient from 'openapi-fetch';
import type { paths as pathsAcquiring } from '../generated/acquiring.js';

export type ClientOptions = Parameters<typeof createClient>[0];

export const createClientMonoAcquiring = (clientOptions: ClientOptions) => {
  return createClient<pathsAcquiring>({
    baseUrl: 'https://api.monobank.ua',
    ...clientOptions,
  });
};

export type * as ApiMonoAcquiring from '../generated/acquiring.js';
