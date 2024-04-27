const mongoose = require('mongoose')

const workFlowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    workflowName: {
        type: String,
        required: true
    },
    nodes: {
        type: Array,
        required: true,
    },
    edges: {
        type: Array,
        required: true
    }
})

const workFlows = mongoose.model("workFlows", workFlowSchema)
module.exports = workFlows