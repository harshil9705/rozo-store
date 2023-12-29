const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const { user } = require("../models/user.schema")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
require("dotenv").config()


const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false , upperCaseAlphabets: false, specialChars: false })

// get 

const getlogin = (req,res)=>{
    res.render("login")
}

const getsignup = (req,res)=>{
    res.render("signup")
}

const getforget = (req,res)=>{
    res.render("forget")
}

const getopt = (req,res)=>{
    res.render("otp")
}

// post

const signup = async(req,res)=>{
    try {
        const {username,email,password,role} = req.body

        const findemail = await user.findOne({email})
        if(findemail){
            res.send({error:"Account Already Exist"})
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    return res.send(err)
                }
                else{
                    const obj = {email,password:hash,username,role}
                    const data = await user.create(obj)
                    const token = jwt.sign({id:data._id,role:data.role},process.env.key)
                    return res.cookie("token",token).redirect("/product")
                }
            })
        }
    } catch (error) {
        res.send({error:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        const data = await user.findOne({email})
        if(data){
            bcrypt.compare(password,data.password,(error,result)=>{
                if(error){
                    res.send({error})
                }
                else if(result){
                    const token = jwt.sign({id:data._id,role:data.role},process.env.key)
                    res.cookie("token",token).cookie("role",data.role).redirect("/product/")
                }
                else{
                    res.send({error:"Password Incorrect"})
                }
            })
        }
        else{
            res.send({message:"Account not exist signup first"})
        }
    } catch (error) {
        res.send({error:error.message})
    }
}

const logout = async(req,res)=>{
    res.clearCookie("token").clearCookie("role").redirect("/product/")
}


const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'harshillakhani009@gmail.com',
        pass:'pmup bkan qwaf qnfz'
    }
})

const mail = async(req,res)=>{
    try {
        const {id} = req.bla
        const data = await user.findById(id)
    
        const mail={
            from:'harshillakhani009@gmail.com',
            to:data.email,
            html:`<p>your varification otp is :- ${otp}</p>`
        }
        transport.sendMail(mail,(error,info)=>{
            if(error){
                console.log(error);
            }
        })
        res.render('otp')
    } catch (error) {
        return res.send({error:error.message})
    }
}

const authotp = (req,res)=>{
    const {otpp} = req.body
    if(otpp == otp){
        res.redirect("forget")
    }
    else{
        res.send('otp is not match')
    }
}

const forget = async(req,res)=>{

    try {
        const {newpass} = req.body;
        const {id} = req.bla;

        const account = await user.findById(id);

        
        bcrypt.hash(newpass,5,async(error,hash)=>{
            if(error){
                res.send({error:error.message});
            }
            else{
                 await user.findByIdAndUpdate(id,{password:hash});
                res.send({message:"password Updated successfully"});
            }
        })
    } catch (error) {
        res.send({error:error.message})
    }
}


module.exports = {getlogin,getsignup,getforget,getopt,signup,login,mail,authotp,forget,logout}