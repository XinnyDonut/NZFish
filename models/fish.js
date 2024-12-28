const mongoose=require('mongoose')
const fishSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  imageUrl:String,
  description:String,
  MaoriName:String
})

fishSchema.set('toJSON',{
  transform:(document,returnedObj) => {
    returnedObj.id=returnedObj._id.toString(),
    delete returnedObj._id,
    delete returnedObj.__v
  }
})

module.exports=mongoose.model('Fish',fishSchema)