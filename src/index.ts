import createClient from 'openapi-fetch';
import type { paths as pathsAcquiring } from '../generated/acquiring.js';
import type { paths as pathsPersonal } from '../generated/personal.js';

export type ClientOptions = Parameters<typeof createClient>[0];

const baseUrl = 'https://api.monobank.ua';

export { baseUrl as URL_API_MONOBANK };

export const createClientMonoAcquiring = (clientOptions: ClientOptions = {}) =>
  createClient<pathsAcquiring>({ baseUrl, ...clientOptions });

export type * as ApiMonoAcquiring from '../generated/acquiring.js';

export const createClientMonoPersonal = (clientOptions: ClientOptions = {}) =>
  createClient<pathsPersonal>({ baseUrl, ...clientOptions });

export type * as ApiMonoPersonal from '../generated/personal.js';
