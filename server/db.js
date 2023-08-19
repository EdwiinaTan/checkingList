const PoolPg = require("pg").Pool
require("dotenv").config()

const pool = new PoolPg({
  user: process.env.USERNAME,
  password: process.env.USERNAME,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
})

module.exports = pool
