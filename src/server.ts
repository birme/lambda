import api from './api';

async function main() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

  const server = api();
  server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`Server listening on ${address}`);
  });
}

export default main();
