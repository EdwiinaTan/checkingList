const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()
const pool = require("./db")

app.get("/", (req, res) => {
  res.send(`Server port: ${process.env.PORT}`)
})

app.get("/list", async (req, res) => {
  const userEmail = "test@test.com"

  try {
    const list = await pool.query("SELECT * FROM list where user_email = $1", [
      userEmail,
    ])
    res.json(list.rows)
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => console.log(`Server port: ${PORT}`))
