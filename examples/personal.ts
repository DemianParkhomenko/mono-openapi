import { createClientMonoPersonal } from '../lib';

const client = createClientMonoPersonal();

const getCurrencies = async () => {
  console.log('Get currencies');
  const {
    data,
    response: { url, status },
  } = await client.GET('/bank/currency');
  console.log({
    url,
    status,
    currenciesLength: data?.length,
    firstCurrency: data?.[0],
  });
};

await getCurrencies();
