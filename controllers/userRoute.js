const bcrypt=require('bcrypt')
const userRouter=require('express').Router()
const User= require('../models/user')
const middleware=require('../utils/middleware')

//register
userRouter.post('/register', async(req,res,next) => {
  try{
    const { username,name,password }=req.body
    const saltRound=10

    if (!password || password.length < 5) {
      throw new Error('password must be at least 5 characters long')
    }
    const passwordHash=await bcrypt.hash(password,saltRound)
    //user is a mongoose document instance
    const user= new User({
      username,
      name,
      passwordHash
    })
    //await user.save() is a mongoose method, it validates against the schema,
    // perform the actual MongoDB insert,
    // and return a Promise tgat resolves to the saved document
    const savedUser= await user.save()
    res.status(201).json(savedUser)
  }catch(err){
    next(err)
  }
})

//private route,get your own profile
userRouter.get('/profile',middleware.userExtractor,async (req,res,next) => {
  try{
    const user=await User.findById(req.user.id)
      .populate({
        path: 'cookingLogs',
        populate: {
          path: 'fish',
          select: 'name imageUrl'
        }
      })
    res.json(user)
  }catch(err){
    next(err)
  }
})

//public route,other users can see your log
userRouter.get('/:id',async(req,res,next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('username name')
      .populate({
        path: 'cookingLogs',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'fish',
          select: 'name imageUrl'
        }
      })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  }catch(err){
    next(err)
  }
})

userRouter.get('/',async(req,res,next) => {
  try{
    const users=await User.find({})
    res.json(users)
  }catch(err){
    next(err)
  }
})


module.exports=userRouter