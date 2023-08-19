const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()
const pool = require("./db")

// app.get("/", (req, res) => {
//   res.send("Server port")
// })

// get list

app.get("/list", async (req, res) => {
  try {
    const list = await pool.query("SELECT * FROM list")
    res.json(list.rows)
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => console.log(`Server port: ${PORT}`))
