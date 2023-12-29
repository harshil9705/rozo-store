const Razorpay = require("razorpay")
const { cart } = require("../models/cart.schema")
require("dotenv").config()

// get
const getcart = (req,res)=>{
    res.render("cart")
}

const show = async(req,res)=>{
    const customerId = req.bla.id
    data = await cart.find({customerId}).populate("productId")
    res.send(data)
}

// post

const senttocart  = async(req,res)=>{
    try {
        const customerId = req.bla.id
        const {id} = req.params
        const qty = 1
    
        let obj = {
            customerId,
            qty,
            productId:id
        }

        const findd = await cart.findOne({customerId,productId:id})

        if(!findd){
            const data = await cart.create(obj)
            res.send(data)
        }
        else{
            const data = await cart.findByIdAndUpdate(findd.id,{qty: findd.qty+1})
            res.send(data)
        }
        // window.location.href("/product/shop")
    } catch (error) {
        res.send({error:error.message})
    }
}

// patch

const quantity = async(req,res)=>{
    const {qty} = req.body
    const {id} = req.params
    const data = await cart.findById(id)
    data.qty = data.qty + qty
    await data.save()
    if(data.qty == 0){
        await cart.findByIdAndDelete(id)
    } 
    res.send({data})
} 

// payment

const razorpayinstance = new Razorpay({
    key_id: "rzp_test_2hrmtbKzfWFZov",
    key_secret: "GjlnwAiZDBcfvJly885efvZI"
})

const payment = async(req,res)=>{
    try {
        const amount = req.body.amount*100
        const option  = {
            amount:amount,
        }
        console.log(amount);
        razorpayinstance.orders.create(option,(error,order)=>{
            if(error){
                res.send({error:error.message,m:"error aave che "})
            }
            else{
                res.send(order)
            }
        })
    } catch (error) {
        res.send({error:error.message})
    }
} 


module.exports = {getcart,senttocart,show,quantity,payment}