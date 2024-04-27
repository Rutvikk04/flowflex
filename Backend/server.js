const express = require("express")
const app = express()
const http = require("http")
const router = require("./routes")
const cors = require('cors')
const connectDB = require("./config/connectDB")
const { notFound, errorHandler } = require("./middlewares/errorHandle")
app.use(express.json())
app.use(cors())
require("dotenv").config()
const server = http.createServer(app)
app.use("/", router)

//error Handler
app.use(notFound)
app.use(errorHandler)

//server start
server.listen(8000, () => {
    connectDB()
    console.log("server started on port 8000")
})