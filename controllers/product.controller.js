const Fuse = require('fuse.js');
const {  product } = require("../models/product.schema")

// get

const home = (req,res)=>{
    res.render("home")
}

const getlist = (req,res)=>{
    res.render("addpro")
}

const getshop = (req,res)=>{
    res.render("shop")
}

const show = async(req,res)=>{
    const data = await product.find()

    res.send(data)
}

const single = async(req,res)=>{
    const {id} = req.params
    const data = await product.findById(id)

    res.render("single",{data})
}

const filter = async(req,res)=>{
    const {category} = req.query

    const data = await product.find({category})

    return res.send(data)
}

const getseller = (req,res)=>{
    res.render("seller")
}

const seller = async(req,res)=>{
    const {id} = req.bla

    const data = await product.find({seller:id})
    return res.send(data)
}

// post

const list = async(req,res)=>{
    try {
        req.body.seller = req.bla.id
        const data = await product.create(req.body);
        res.redirect("getseller");
    } catch (error) {
        res.send({error:error.message});
    };
}

// patch

const updatestock = async(req,res)=>{
    try {
        const stock = req.body.stock
        const {id} = req.params

        const update = await product.findById(id)
        update.stock = stock;
        update.save();
        res.send("updated")
    } catch (error) {
        res.send({error:error.message})
    }
}

const search = async(req,res)=>{
    try {
        const {query} = req.query;
        const products = await product.find();

        const options = {
            keys:["category", "price", "title"]
        }

        const fuse = new Fuse(products,options);
        const result = fuse.search(query);
        
        return res.send(result);
        
    } catch (error) {
        return res.send({error:error.message})
    }
}



module.exports = {home,getlist,show,getshop,list,single,filter,seller,getseller,updatestock,search}