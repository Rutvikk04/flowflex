const express = require("express")
const { login, register } = require("../controllers/auth")
const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/register", register)

module.exports = authRoutes