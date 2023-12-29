const { default: mongoose } = require("mongoose");
const connection = ()=>{
    mongoose.connect("mongodb+srv://harshillakhani009:harshillakhani009@cluster0.pukbpzd.mongodb.net/?retryWrites=true&w=majority")
    console.log("database connected");
}

module.exports = {connection}