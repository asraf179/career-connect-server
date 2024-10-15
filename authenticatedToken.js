require('dotenv').config();
var jwt = require("jsonwebtoken");

const authenticatedToken=(req,res,next)=>{
        const token=req.cookies.token;
       
        if(!token){
               return res.status(401).send({message:"Unauthorized"});
        }
        try{
                const decoded = jwt.verify(token, process.env.access_token_secret);
               req.user=decoded;
                next();

        }
        catch
        {
                res.status(401).send({message:"Unauthorized"});

        }
}
module.exports=authenticatedToken;