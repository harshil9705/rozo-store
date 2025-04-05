const { default: mongoose } = require("mongoose");
const connection = ()=>{
    mongoose.connect(process.env.db_url)
    console.log("database connected");
}

module.exports = {connection}
