const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const generateToken = require("../config/generateToken")
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser && await existingUser?.checkPassword(password)) {
        let token = await generateToken(existingUser._id)
        res.status(200).send({ message: "Login successful", token })
    }
    else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    const existingEmail = await User.find({ email })
    if (existingEmail.length) {
        res.status(400)
        throw new Error("Email already Exist")
    }
    else {
        let newUser = await User({
            username, email, password
        })
        await newUser.save()
        res.send({ message: "Registration successful" })
    }
})
module.exports = { login, register }