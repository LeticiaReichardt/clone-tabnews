import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage(_, tentativas) {
      console.log(
        `Tentativa ${tentativas}: Verificando status do servidor web...`,
      );
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error(
          `Status do servidor web não está ok. Resposta: ${response.status}`,
        );
      }
    }
  }
}
export default {
  waitForAllServices,
};
