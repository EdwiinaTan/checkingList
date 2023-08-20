const PORT = process.env.PORT ?? 8000
const uuidv4 = require("uuid").v4
const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, res) => {
  res.send(`Server port: ${process.env.PORT}`)
})

app.get("/list", async (_, res) => {
  try {
    const list = await pool.query("SELECT * FROM list")
    res.json(list.rows)
  } catch (err) {
    console.error(err)
  }
})

app.get("/list/:userEmail", async (req, res) => {
  console.log("req", req)
  const { userEmail } = req.params

  try {
    const list = await pool.query("SELECT * FROM list where user_email = $1", [
      userEmail,
    ])
    res.json(list.rows)
  } catch (err) {
    console.error(err)
  }
})

app.post("/list", async (req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuidv4()
  console.log("req.body", req.body)

  try {
    const newList = await pool.query(
      "INSERT INTO list(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)",
      [id, user_email, title, progress, date]
    )
    console.log("newList", newList)
    res.json(newList)
  } catch (err) {
    console.error(err)
  }
})

app.put("/list/:id", async (req, res) => {
  const { id } = req.params
  const { user_email, title, progress, date } = req.body
  try {
    const editList = await pool.query(
      "UPDATE list SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5",
      [user_email, title, progress, date, id]
    )
    res.json(editList)
  } catch (error) {
    console.error(err)
  }
})

app.delete("/list/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removeItem = await pool.query("DELETE FROM list WHERE id=$1", [id])
    res.json(removeItem)
  } catch (error) {
    console.error(err)
  }
})

app.listen(PORT, () => console.log(`Server port: ${PORT}`))
