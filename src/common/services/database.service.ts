import debug from "debug";
import { Sequelize } from "sequelize";

const log: debug.IDebugger = debug("app:database-service");

class DatabaseService {
  private count = 0;
  private sequelize: undefined | Sequelize;

  constructor() {
    this.connectWithRetry();
  }

  getDatabase() {
    return this.sequelize;
  }

  connectWithRetry = () => {
    log("Attempting Database connection (will retry if needed)");

    this.sequelize = new Sequelize({
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      dialect: "mysql",
    });

    this.sequelize
      .authenticate()
      .then(() => {
        log("Database is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `Database connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}
export default new DatabaseService();
