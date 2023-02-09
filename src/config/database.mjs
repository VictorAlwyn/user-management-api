import * as dotenv from "dotenv";

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

export default {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: true,
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // remove logs
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};
