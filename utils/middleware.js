const logger=require('../utils/logger')
const jwt=require('jsonwebtoken')

const requestLogger=(request,response,next) => {
  console.log('request logger:')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError'
    && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error:'expected `username` to be unique' })
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }else if (error.name === 'NotFoundError') {
    return response.status(404).json({ error: 'resource not found' })
  }
  next(error)
}


const tokenExtractor=(request,response,next) => {
  const auth=request.get('authorization')
  if(auth&&auth.startsWith('Bearer ')){
    request.token=auth.replace('Bearer ','')
  }else{
    request.token=null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = decodedToken
    next()
  } catch (error) {
    next(error)
  }
}



module.exports={
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  tokenExtractor }

