import database from "infra/database.js";

async function status(request, response) {
  // return response.status(500).json({ Error: "error" });
  const updateAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsvalue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsvalue),
        opened_connections: databaseOpenConnectionsResult.rows[0].count,
      },
    },
  });
  console.log("Status atualizado em: " + updateAt);
  console.log("Versão do banco de dados: " + databaseVersionValue);
  console.log(
    "Máximo de conexões do banco de dados: " + databaseMaxConnectionsvalue,
  );
  console.log(
    "Conexões abertas do banco de dados: " +
      databaseOpenConnectionsResult.rows[0].count,
  );
}

export default status;
