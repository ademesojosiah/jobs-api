const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequest} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{

    const user = await User.create({...req.body}) 
    const {_id,name} = user

    const token = jwt.sign({userId:_id,name:name},'jwtSecret',{expiresIn:'30d'})
    res.status(StatusCodes.CREATED).json({user:{user:name},token})


}

const login = async (req,res)=>{
    res.send('login user')
}

module.exports = {register,login}