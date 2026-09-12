const jwt = require('jsonwebtoken');
const {BadRequestError , UnauthenticatedError} = require('../errors/')
const User = require('../model/model')

const register = async(req,res)=>{
    const {email , username , password} = req.body;
    const user  = await User.create({email : email , username : username , password : password});
    console.log('we are good with register...');
    res.status(200).json({msg: `${user.username} ,you have registered successfully... `});
}

const login = async(req,res)=>{
    const {email, password} = req.body;
    if(!email){
        throw new BadRequestError('Please provide Username..');
    }
    if(!password){
        throw new BadRequestError('Please provide password...');
    }
    const user = await User.findOne({email: email});
    if(!user){
        throw new UnauthenticatedError('No User found...');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = jwt.sign({id : user._id , username : user.username} , process.env.JWT_SECRET ,{expiresIn :'30d'});
    res.status(200).json({ msg: 'user created', token })

}

const dashboard = async(req,res)=>{
    res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data...`,
  })

}

module.exports = {register,login,dashboard};