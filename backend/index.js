
const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
const connectTMongo = require('./db');

app.use(express.json())
app.use(cors())

connectTMongo();


// Available Routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})