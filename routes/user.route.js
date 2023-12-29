const {Router} = require("express")
const { getsignup, getlogin, signup, login,  mail, getforget, getopt, authotp, forget, logout } = require("../controllers/user.controllers")
const { authuser } = require("../middleware/user.middleware")
const userrouter = Router()

// get

userrouter.get("/signup",getsignup)

userrouter.get("/login",getlogin)

userrouter.get("/mail",authuser,mail)

userrouter.get("/verifyotp",authotp)

userrouter.get("/otp",getopt)

userrouter.get("/forget",getforget)

userrouter.get("/logout",logout)

// post

userrouter.post("/signup",signup)

userrouter.post("/login",login)

userrouter.post("/otp",authotp)

userrouter.post("/forget",authuser,forget)



module.exports = {userrouter}