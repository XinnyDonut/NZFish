const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  name:String,
  passwordHash:{
    type:String,
    required:true
  },
  cookingLogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'CookingLog'
    }
  ]
})

userSchema.set('toJSON',{
  transform:(document,returnedObj) => {
    returnedObj.id=returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.passwordHash
  },
  versionKey:false
})

module.exports=mongoose.model('User',userSchema)