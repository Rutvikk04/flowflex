const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre("save", async function (next) {
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema)
module.exports = User