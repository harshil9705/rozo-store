const express = require("express")
const app = express()
const cookie = require("cookie-parser")
const { connection } = require("./configs/db")
const { userrouter } = require("./routes/user.route")
const { proroute } = require("./routes/product.route")
const { cartroute } = require("./routes/cart.route")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())

// app.set("view engine","ejs")
// app.set("views",__dirname+ "/views")
// app.use(express.static(__dirname + "/public"))

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))

app.use("/user",userrouter)
app.use("/product",proroute)
app.use("/cart",cartroute)

app.get("/",(req,res)=>{
    res.send("store")
})

app.listen(8090,()=>{
    console.log("http://localhost:8090");
    connection()
})