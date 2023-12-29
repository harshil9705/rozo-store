const { default: mongoose } = require("mongoose");

const userschema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})

const user = mongoose.model("user",userschema)

module.exports = {user}