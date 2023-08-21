module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USERNAME,
  DB: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
