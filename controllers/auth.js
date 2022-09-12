const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequest,UnAuthenticatedError} = require('../errors')


const register = async (req,res)=>{

    const user = await User.create({...req.body}) 
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user:{user:user.name},token})


}

const login = async (req,res)=>{
 const {email,password} = req.body

    if(!email || !password){
        throw new BadRequest('Please Provide email and password')
    }
 const user = await User.findOne({email})
 // compare password
    if(!user){
        throw new UnAuthenticatedError('invalid Credentials')
    }

 const token = user.createJwt()
 res.status(StatusCodes.OK).json({user:{name:user.name},token})



}


module.exports = {register,login}