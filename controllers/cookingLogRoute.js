const CookingLog= require('../models/cookingLog')
const User = require('../models/user')
const Fish = require('../models/fish')
const cookingLogRouter=require('express').Router()
const { userExtractor }=require('../utils/middleware')

// Create new cooking log
cookingLogRouter.post('/', userExtractor, async (req, res, next) => {
  try {
    const { fishId, name, note, rating, ingredients } = req.body
    const user = await User.findById(req.user.id)
    const fish = await Fish.findById(fishId)

    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' })
    }

    const cookingLog = new CookingLog({
      name,
      fish: fish._id,
      user: user._id,
      note,
      rating,
      ingredients
    })

    const savedLog = await cookingLog.save()
    user.cookingLogs = user.cookingLogs.concat(savedLog._id)
    await user.save()

    const populatedLog = await CookingLog.findById(savedLog._id)
      .populate('fish', { name: 1, imageUrl: 1 })
      .populate('user', { username: 1, name: 1 })

    res.status(201).json(populatedLog)
  } catch (error) {
    next(error)
  }
})

// Get all logs for a specific fish
cookingLogRouter.get('/fish/:fishId', async (req, res, next) => {
  try {
    const logs = await CookingLog.find({ fish: req.params.fishId })
      .populate('fish', { name: 1, imageUrl: 1 })
      .populate('user', { username: 1, name: 1 })
      .sort({ createdAt: -1 })

    res.json(logs)
  } catch (err) {
    next(err)
  }
})

//Get all your own logs
cookingLogRouter.get('/my',userExtractor,async (req,res,next) => {
  try{
    const logs=await CookingLog.find({ user:req.user.id })
      .populate('fish',{ name:1, imageUrl:1 })
      .sort({ createdAt:-1 })
    res.json(logs)
  }catch(err){
    next(err)
  }
})


//update your own log
cookingLogRouter.put('/:id',userExtractor,async(req,res,next) => {
  try {
    const body =req.body
    const updatedData = {
      name:body.name,
      fish:body.fish,
      note:body.note,
      rating:body.rating
    }
    console.log('updatedData', updatedData)
    const log = await CookingLog.findById(req.params.id)
    if (!log) {
      return res.status(404).json({ error: 'Log not found' })
    }
    if (log.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this log' })
    }

    const updatedLog = await CookingLog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true  }
    )
      .populate('fish', { name: 1, imageUrl: 1 })
      .populate('user', { username: 1, name: 1 })

    res.json(updatedLog)
  } catch (err) {
    next(err)
  }
})

//delete your own log
cookingLogRouter.delete('/:id',userExtractor,async (req,res,next) => {
  try{
    const log=await CookingLog.findById(req.params.id)
    if(!log){
      return res.status(404).json({ error: 'Log not found' })
    }

    if(log.user.toString() !== req.user.id){
      return res.status(403).json({ error: 'Not authorized to delete this log' })
    }

    await CookingLog.findByIdAndDelete(req.params.id)
    await User.findByIdAndUpdate(req.user.id,
      { $pull: { cookingLogs: req.params.id } }
    )
    res.status(204).end()
  }catch(err){
    next(err)
  }
})

//Others can get a single log
cookingLogRouter.get('/:id', async (req,res,next) => {
  try{
    const log=await CookingLog.findById(req.params.id)
      .populate('fish', { name:1, imageUrl:1 })
      .populate('user', { username:1, name:1 })

    if(!log){
      return res.status(404).end()
    }
    res.json(log)
  }catch(err){
    next(err)
  }
})



module.exports=cookingLogRouter