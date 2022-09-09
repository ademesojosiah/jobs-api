const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide your name'],
        minlength:[3, 'minimium of 3'],
        maxlength:50   
     },
    email:{
        type:String,
        required:[true,'Please Provide your name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Please Provide password'],
        minlength:[6, 'minimium of 6'],
        maxlength:12   
    },
})



module.exports = mongoose.model('User',UserSchema)