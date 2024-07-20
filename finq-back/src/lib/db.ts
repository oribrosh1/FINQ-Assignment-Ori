import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

let connection: DataSource;
const dbConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  synchronize: true,
  logging: true,
  entities: ["dist/src/api/entities/*.entity.js"],
  migrations: ["dist/src/migration/**/*.ts"],
};

console.log(dbConfig);


async function postgresConnect(): Promise<DataSource> {
  const ds = new DataSource(dbConfig);
  await ds.initialize();
  connection = ds;
  return connection;
}

export { postgresConnect, connection };
