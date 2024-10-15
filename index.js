const express=require ('express');
const cors=require('cors');
const mongoose = require('mongoose');
const authRoutes=require('./userHandler/authRoutes')
const cookieParser = require('cookie-parser');
const app=express();
const port=process.env.PORT || 5000;
const userProfileRoutes=require('./userHandler/userProfile');
const job=require('./job')
const skills=require('./skills')

//middleware
app.use(cors(
        {
                origin:[
                'http://localhost:5173',
                ],
                credentials:true,
        }
))
app.use(express.json());
app.use(cookieParser());
app.use(express.static('upload'));

//connect server
mongoose.connect('mongodb://127.0.0.1:27017/career_connect',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
}).then(()=>console.log("connection successfully"))
.catch(err=>console.log(err));

app.use("/user",authRoutes);
app.use("/user",userProfileRoutes);
app.use("/job",job)
app.use("/skills",skills)

app.get("/",async(req,res)=>{
        res.send("start the server")
})

app.listen(port,async(req,res)=>{
        console.log(`server is running at port:${port}`);
})