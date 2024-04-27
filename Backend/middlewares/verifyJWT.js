const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const tokenVerify = asyncHandler(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.headers.token
    if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.userID = decoded.UserID
        next()
    }
    else {
        throw new Error("You are Not authorized for this route")
    }
})

module.exports = tokenVerify