import { createClientMonoPersonal } from '../lib';

const client = createClientMonoPersonal();

const { data, response } = await client.GET('/bank/currency');
console.log(data, response.status, response.statusText);
