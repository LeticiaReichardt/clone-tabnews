const { exec } = require("node:child_process");

function checkPostgresReady() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgresReady();
      return;
    }

    console.log("🟢 Postgres is ready!");
    //   if (error) {
    //     console.error(`Error executing pg_isready: ${error.message}`);
    //     setTimeout(checkPostgresReady, 2000);
    //     return;
    //   }
    // const { Client } = require("pg");
    // const client = new Client({
    //   host: process.env.POSTGRES_HOST,
    //   port: process.env.POSTGRES_PORT,
    //   user: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    // });

    // console.log("🔴 Waiting for Postgres to be ready...");

    // return client
    //   .connect()
    //   .then(() => {
    //     console.log("🟢 Postgres is ready!");
    //     client.end();
    //   })
    //   .catch((err) => {
    //     console.log("🔴 Postgres is not ready yet. Retrying in 2 seconds...");
    //     setTimeout(checkPostgresReady, 2000);
    //   });
  }
}

process.stdout.write(
  "\n\n🔴 Postgres is not ready yet. Retrying in 2 seconds...",
);
checkPostgresReady();
