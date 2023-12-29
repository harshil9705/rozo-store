const { default: mongoose } = require("mongoose");

const productschema = new mongoose.Schema({
    title:String,
    price:Number,
    decription:String,
    image:String,
    stock:Number,
    category:String,
    rating:[{userId :String , value:Number}],
    size:String,
    colour:String,
    seller:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

const product = mongoose.model("product",productschema)

module.exports = {product}