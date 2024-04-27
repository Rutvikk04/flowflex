const express = require("express")
const authRoutes = require("./authRoutes")
const nodeRoutes = require("./nodeRoutes")
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/workflow", nodeRoutes)

module.exports = router