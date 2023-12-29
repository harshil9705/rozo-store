const {Router} = require("express")
const { home, getlist, list, getshop, show, single, filter, seller, getseller, updatestock, search } = require("../controllers/product.controller")
const {  authuser, authadmin } = require("../middleware/user.middleware")
const proroute = Router()

// get

proroute.get("/",home)

proroute.get("/list",authadmin,getlist)

proroute.get("/shop",getshop)

proroute.get("/show",show)

proroute.get("/single/:id",single)

proroute.get("/filter",filter)

proroute.get("/seller",authadmin,seller)

proroute.get("/getseller",authadmin,getseller)

proroute.get("/search",search)


// post

proroute.post("/list",authadmin,list)

proroute.patch("/stockupdate/:id",updatestock)

module.exports = {proroute}