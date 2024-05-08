import { createClientMonoAcquiring } from '../lib/index.js';

console.log('You can provide X_TOKEN and WEBHOOK_URL as environment variables');

const client = createClientMonoAcquiring({
  headers: {
    'X-Token': process.env.X_TOKEN,
  },
});

const webHookUrl = process.env.WEBHOOK_URL;

{
  console.log('Create invoice');
  const { data, response } = await client.POST('/api/merchant/invoice/create', {
    body: {
      amount: 1000,
      ccy: 840,
      webHookUrl,
      merchantPaymInfo: {
        reference: 'your_custom_id_stored_in_DB',
      },
    },
  });
  console.log(response.url, response.status, data, response.statusText);
}
