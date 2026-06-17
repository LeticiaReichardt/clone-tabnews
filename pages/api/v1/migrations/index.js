import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    response.setHeader("Allow", allowedMethods);
    return response
      .status(405)
      .json({ error: `Method "${request.method}" not allowed` });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
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
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      console.log("Entrou no POST:\n" + request.method);
      const migrateMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      if (migrateMigrations.length > 0) {
        return response.status(201).json(migrateMigrations);
      }
      return response.status(200).json(migrateMigrations);
    }
  } catch (error) {
    console.error("Error during migration:", error);
    //throw error;
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Ensure the database client is closed after the operation
    await dbClient.end();
  }
}
