const fishRouter = require('express').Router()
const Fish=require('../models/fish')

fishRouter.get('/', async (req, res,next) => {
  try{
    const allFish=await Fish.find({})
    res.json(allFish)
  }catch(err){
    res.status(500).json({ error: 'Failed to fetch fish data' })
    next(err)
  }
})

fishRouter.get('/:id', async (req, res,next) => {
  console.log(req.params)
  try{
    const id=req.params.id
    const fish=await Fish.findById(id)
    if(fish){
      res.json(fish)
    }else{
      res.status(404).json({ error:'Fish not found' })
    }
  }catch(err){
    res.status(400).json({ error: 'Invalid id format' })
    next(err)
  }
})

fishRouter.post('/', async (req, res,next) => {
  try{
    const body=req.body
    const fish= new Fish({
      name:body.name,
      imageUrl:body.imageUrl,
      description:body.description,
      MaoriName:body.MaoriName
    })
    const savedFish=await fish.save()
    res.status(201).json(savedFish)
  }catch(err){
    next(err)
  }
})

module.exports = fishRouter