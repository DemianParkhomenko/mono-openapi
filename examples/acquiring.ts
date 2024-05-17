import { createClientMonoAcquiring } from '../lib/index.js';

console.log('You can provide X_TOKEN and WEBHOOK_URL as environment variables');
console.log(
  'For storing webhook you can use: https://webhook-test.com/ or similar service'
);
console.log('Test token you can find here: https://api.monobank.ua/');

const client = createClientMonoAcquiring({
  headers: {
    'X-Token': process.env.X_TOKEN,
  },
});

const webHookUrl = process.env.WEBHOOK_URL;

const logResult = (result: any) =>
  console.log(
    JSON.stringify(
      {
        url: result?.response?.url,
        status: result?.response?.status,
        data: result?.data,
        statusText: result?.response?.statusText,
      },
      null,
      2
    )
  );

const walletId = '94c45a56-106a-42b4-b347-30ba63b670b8';

const createInvoice = async () => {
  console.log('Create invoice');
  const result = await client.POST('/api/merchant/invoice/create', {
    body: {
      amount: 100,
      ccy: 840,
      webHookUrl,
      saveCardData: {
        saveCard: true,
        walletId,
      },
      merchantPaymInfo: {
        // Can be custom id stored in your database
        reference: 'example_of_custom_id',
      },
    },
  });
  logResult(result);
};

const getWalletData = async () => {
  console.log('Get wallet data');
  const result = await client.GET('/api/merchant/wallet', {
    params: { query: { walletId } },
  });
  logResult(result);
};

const chargeByToken = async () => {
  console.log('Charge by token');
  const result = await client.POST('/api/merchant/wallet/payment', {
    body: {
      amount: 1000,
      ccy: 840,
      webHookUrl,
      cardToken: '240508D4FhxLTV68i5T6',
      initiationKind: 'merchant',
      merchantPaymInfo: {
        // Can be custom id stored in your database
        reference: 'example_of_custom_id',
      },
    },
  });
  logResult(result);
};

await createInvoice();
await chargeByToken();
await getWalletData();
