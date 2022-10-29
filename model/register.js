var mongoose=require("mongoose");
 const { Schema } = mongoose;
//define schema for collection
const registerSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: String,
  mobile:Number,
  password: String,
  date: { type: Date, default: Date.now },
  
});

//creating model
const register = mongoose.model('register', registerSchema);
module.exports=register;