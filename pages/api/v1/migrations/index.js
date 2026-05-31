import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).json({ error: "Method not allowed" });
  }

  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dryRun: true,
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    console.log("Entrou no POST:\n" + request.method);
    const migrateMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();
    if (migrateMigrations.length > 0) {
      return response.status(201).json(migrateMigrations);
    }
    return response.status(200).json(migrateMigrations);
  }
  await dbClient.end();
  return response.status(405).end();
}
