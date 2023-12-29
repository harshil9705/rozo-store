const { default: mongoose, mongo } = require("mongoose");

const cartchema = new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"product"},
    qty:Number,
    customerId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
})

const cart = mongoose.model("cart",cartchema)

module.exports = {cart}