module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC,
  logging: process.env.ORM_LOGGING,
  entities: ["dist/**/*.entity.{js,ts}"],
  subscribers: ["src/subscriber/**/*.ts"],
};
