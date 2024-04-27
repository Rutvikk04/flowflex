const express = require("express")
const nodeRoutes = express.Router()
const tokenVerify = require("../middlewares/verifyJWT")
const { createWorkFlow, getWorkFlows, handleFileAction } = require("../controllers/workflow")

const multer = require('multer')
const storage = multer.diskStorage({ destination: 'user-uploads/' })
const upload = multer({ storage })
nodeRoutes.post("/create-workflow", tokenVerify, createWorkFlow)
nodeRoutes.get("/get-workflows", tokenVerify, getWorkFlows)
nodeRoutes.post("/workflow-action", tokenVerify, upload.single('file'), handleFileAction)

module.exports = nodeRoutes