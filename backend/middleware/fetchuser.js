var jwt = require('jsonwebtoken');
const JWT_secret="alamin@ok";
const fetchuser=(req,res,next)=>{
    // get the user from jwt 
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Please authenticate using a valid token'})
    }
   try {
    const data=jwt.verify(token,JWT_secret);
    req.user=data.user;
    next()
       
   } catch (error) {
    res.status(401).send({error:'Please authenticate using a valid token'})
   }
  
}
module.exports=fetchuser;