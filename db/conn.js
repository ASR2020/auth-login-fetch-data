 var mongoose=require("mongoose");
 mongoose.connect('mongodb://localhost:27017/batch1')
 .then(()=>{
    console.log("connected");
 })
 .catch(()=>{
    console.log("not connected")
 })