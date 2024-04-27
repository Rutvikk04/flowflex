const mongoose = require("mongoose")
const url = process.env.BACKEND_URL || 'mongodb://127.0.0.1:27017/flowflex'

const connectDB=()=>{
    mongoose.set("strictQuery", true)
    mongoose.connect(url).then(() => console.log("Database Connected Successfully")).catch(e => console.log("error while connecting to Db", e))
}
module.exports= connectDB