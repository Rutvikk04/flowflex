const asyncHandler = require("express-async-handler")
const workFlows = require("../models/workflowModel")
const fs = require('fs')
const csv = require('csv-parser');
const createWorkFlow = asyncHandler(async (req, res) => {
  const { nodes, edges, workflowName } = req.body
  const newWorkFlow = new workFlows({
    user: req.userID,
    workflowName,
    nodes,
    edges
  })
  await newWorkFlow.save()
  res.send({ message: "workFlow saved successfully!" })
})

const getWorkFlows = asyncHandler(async (req, res) => {
  const userWorkFlows = await workFlows.find({ user: req.userID })
  res.send({ workFlows: userWorkFlows })
})

const handleWorkFlowOperation = asyncHandler(async (req, res) => {

})

const handleFileAction = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.send({ message: "No file Found" })
  }
  else {
    if (req.body.workflowName==="csv-to-json") {
      const csvData = []; // Array to store parsed JSON objects

      // Use csv-parser to read the uploaded CSV file
      const csvFileStream = fs.createReadStream(req.file.path);
      const csvParser = csv();

      csvFileStream.pipe(csvParser)
        .on('data', (data) => csvData.push(data))
        .on('end', async () => {
          // Once parsing is complete, convert the CSV data to JSON
          const jsonData = JSON.stringify(csvData);

          // Do something with the jsonData (e.g., send response, save to database)
          res.send({ message: 'File uploaded and converted to JSON successfully!', jsonData });
          fs.unlink(req.file.path, (err) => {
            console.log(err)
          });
        })
        .on('error', (err) => {
          console.error('Error parsing CSV:', err);
          res.status(500).send('Error converting file to JSON');
        });
    }
    else{
      res.send({message:"More flow operations coming soon!"})
    }
  }
})

module.exports = { createWorkFlow, getWorkFlows, handleWorkFlowOperation, handleFileAction }