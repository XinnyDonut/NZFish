require('dotenv').config()

const PORT=process.env.PORT||5000
const MONGODB_URL=process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URL
}