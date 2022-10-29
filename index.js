var express = require("express");
const app = express(); //executable
require("./db/conn");
//model connect
const Register = require("./model/register");
const urlencodedParser=express.urlencoded({ extended: true })
// Register.find({},function(err,register){
//   if(err) console.warn(err);
//   console.warn(register);
//   console.warn(register.name)
// })

// const fs=require("fs")
// var session=require("express-session")

// app.use(session({
//   secret: 'arjun',
//   resave: false,
//   saveUninitialized: true,
//   cookie:{ maxAge:9000}
// }))

//const users = require("./data.json");
//app.use(express.json());//to recevive body data.

//to receive body data
//var bodyParser=require("body-parser")
var path = require("path");
const register = require("./model/register");
const folderpath = path.join(__dirname);
//console.log(folderpath)

app.use(express.static(folderpath));
app.set("view engine", "ejs");
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.get("/", (req, res) => {
  // res.sendFile(folderpath + "/index");
  // res.send("Home1")
  res.render("index");
});

app.get("/about", (req, res) => {
  //res.sendFile(folderpath + "/about");
  // res.send("Home1")
  res.render("about");
});
app.get("/contact", (req, res) => {
  //res.sendFile(folderpath + "/about");
  // res.send("Home1")
  res.render("contact");
  //console.log(req.body)
});

app.get("/fetch", (req, res) => {
  
  register.find({}, function (err, Register) {
    res.render("fetch", {
      userlist: Register,
    });
  });
});



///delete
app.get("/deleteUser/:id",async(req,res)=>{
  const id=req.params.id
  await Register.findByIdAndRemove(id);
  res.redirect('/fetch')
})
///get details api for single user////
app.get("/updateUser/:id",async(req,res)=>{
  const id=req.params.id
  let oneUser=await Register.findById(id);
  res.render('updateUser',{user:oneUser})
}) 

///update post api
app.post("/updateUser/:id",async(req,res)=>{
  const id=req.params.id
  await Register.findOneAndUpdate({_id:id},{
    $set:{
      name:req.body.name,
      email:req.body.email,
      mobile:req.body.mobile,
      password:req.body.password
    }
  })
  res.redirect("/fetch")
});

app.get("/register", (req, res) => {
  res.render("register", { msg: "" });
});
app.post("/register", async (req, res) => {

  
  
  // const aname = Register.findOne({ name: req.body.name });
  // console.log(name)

  const userEmail = await Register.findOne({ email: req.body.email });
  console.log(userEmail);
  if (userEmail) {
    res.render("register", { msg: "already registered with this email id" });
  } else {
    let register = new Register({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    });

    let data = await register.save();
    //console.log(data)
    res.render("register", { msg: "Register successfully" });
  }
  //res.sendFile(folderpath + "/about");
  // res.send("Home1")
  // console.log(req.body)
  // res.send("register")

  // let isValid=users.findIndex((u)=>{
  //   return u.email===req.body.email
  // });
  // if(isValid===-1)
  // {
  //   let fileData=JSON.parse(fs.readFileSync("data.json"));
  //   fileData.push(req.body)
  //   fs.writeFileSync("data.json",JSON.stringify(fileData,null,4))
  //   res.render("register",{msg:"Register Successfully"})
  // }
  // else{

  //   res.render("register",{msg:"Already registered with this email id"})
  // }
});

// app.get("/About",(req,res)=>{
//     res.send("About")
// });

app.get("/dashboard", (req, res) => {
  register.find({}, function (err, Register) {
    res.render("fetch", {
      userlist: Register,
    });
  });
  // res.render("dashboard", { u: req.session.userData });
  //res.render("fetch");
});
app.get("/logout", (req, res) => {
  res.redirect("login");
  // req.session.destroy(function(err)
  // {
  //   res.redirect("login")
  // })
});
app.get("/login", (req, res) => {
  res.render("login", { msg: "" });
});
app.post("/login", async (req, res) => {

  
  const userEmail = await Register.findOne({ 
    email: req.body.email,
    password:req.body.password 
  
  });

if(!userEmail){
  res.render("login",{msg:"you are not registered user with this email id"})
}
else{

  res.render("dashboard",{ u:req.body.email })
  console.log(req.body.email)
}

});

app.get("/*", (req, res) => {
  //res.sendFile(folderpath + "/404");
  res.render("404");
  // res.send("<h1>page not found</h1>");
});
app.listen(4000, () => {
  console.log("App running on port 4000");
  console.log("http://localhost:4000");
});
