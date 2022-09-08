const mongoose = require('mongoose')



const connectDB =()=>{
mongoose.connect(url)
}

module.exports = connectDB