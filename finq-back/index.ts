import { config } from "dotenv";
config();

import { logger } from "./src/lib/logger";
import { app } from "./src/lib/app";
import { postgresConnect } from "./src/lib/db";

async function main() {
  try {
    await postgresConnect();
    logger.debug("Initialized Postgres connection successfully");
    app.listen(process.env.PORT, () => {
      logger.info(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    logger.error(`Could not run the application ${err}`);
    process.exit(1);
  }
}

main();
