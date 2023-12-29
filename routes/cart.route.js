const {Router} = require("express")
const { authuser } = require("../middleware/user.middleware")
const { getcart, senttocart, show, quantity, payment } = require("../controllers/cart.controller")
const cartroute = Router()

// get

cartroute.get("/getcart",authuser,getcart)

cartroute.get("/showcart",authuser,show)

// post

cartroute.post("/tocart/:id",authuser,senttocart)

cartroute.post("/payment",payment)
// patch

cartroute.patch("/manageqty/:id",quantity)

module.exports = {cartroute,senttocart}
