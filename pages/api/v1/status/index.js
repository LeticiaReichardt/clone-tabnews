import database from "infra/database.js";

async function status(request, response) {
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
}

export default status;
