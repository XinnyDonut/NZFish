const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const config = require('./utils/config')
const middleware=require('./utils/middleware')
const logger = require('./utils/logger')

const app=express()

mongoose.set('strictQuery',false)
logger.info('connecting to',config.MONGODB_URL)

const conn= async ()=>{
  try{
    await mongoose.connect(config.MONGODB_URL)
    logger.info('connected to MongoDB')
  }catch(error){
    logger.error('error connecting to MongoDB', error.message)
  }
} 
conn()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app