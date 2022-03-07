const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_secret="alamin@ok";
router.post('/createuser',[
    body('email','Enter vaild Email').isEmail(),
    body('password','Enter vaild Password!').isLength({ min: 5 }),
    body('name','Enter vaild name').isLength({ min: 3 }),
],async(req,res)=>{
// if there are errors, return Bad req and error


try{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
//     console.log(req.body);
//    const user=User(req.body);
//    user.save();
//    res.send(req.body);

let user=await User.findOne({email:req.body.email});
if(user){
return res.status(400).json({error:'sorry a user with this mail already exits'})
}
const salt = await bcrypt.genSaltSync(10);

const secPass=await bcrypt.hash( req.body.password,salt);
user=await User.create({
  name: req.body.name,
  email: req.body.email,

  password: secPass

})
const data={
  user:{
    id:user.id
  }
}
const authData=jwt.sign(data,JWT_secret);
console.log(authData);
// res.json(user);
res.json({authData})
}

catch(error){
  console.error(error.message);
  res.status(500).send('some error occoured !');
}

    
  
  // .then(user => res.json(user))
  // .catch((err)=>{
  //    res.json({err:'enter vailid email'+err.message})
  // })



})


// auth user /login

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})


// route:3 
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports=router;