const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const config = require('./utils/config')
const middleware=require('./utils/middleware')
const logger = require('./utils/logger')
const fishRouter=require('./controllers/fishRoute')
const userRouter=require('./controllers/userRoute')
const loginRouter=require('./controllers/loginRoute')
const cookingLogRouter=require('./controllers/cookingLogRoute')
const app=express()

mongoose.set('strictQuery',false)
logger.info('connecting to',config.MONGODB_URL)

const conn= async () => {
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
app.use(middleware.tokenExtractor)
app.use('/api/fish',fishRouter)
app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use('/api/logs',cookingLogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app