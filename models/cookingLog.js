const mongoose = require('mongoose')

const cookingLogSchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    fish:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Fish',
      required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    note:String,
    rating:{
      type:Number,
      min:1,
      max:5
    },
    ingredients:[String],
    photos:[String]
  },{ timestamps:true }
)

cookingLogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('CookingLog',cookingLogSchema)