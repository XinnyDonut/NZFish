const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const loginRouter=require('express').Router()
const User= require('../models/user')

loginRouter.post('/',async(req,res,next) => {
  try{
    const{ username,password }=req.body
    //Mongoose query that returns the first user that match the userName, or null if none found
    const user= await User.findOne({ username })
    const passwordCorrect=user===null
      ?false
      :await bcrypt.compare(password,user.passwordHash)

    if(!(user&&passwordCorrect)){
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken ={
      username:user.username,
      id:user._id
    }
    //create webToken
    const token = jwt.sign(
      userForToken,//dont include sensitive data here
      process.env.SECRET,
      { expiresIn: '30d' })

    res.status(200).send({
      token,
      username:user.username,
      name:user.name
    })
  }catch(err){
    next(err)
  }
})

module.exports=loginRouter
