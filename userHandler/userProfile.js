const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const{UserProfile,Student,Alumni}=require('../schema/userProfileSchema')
const authenticatedToken=require("../authenticatedToken");
const{upload}=require("../storage");

router.post("/userprofile",authenticatedToken,upload.single('image'),async(req,res)=>{
        console.log( req.file ? req.file.filename : null);
        const image=req.file ? req.file.filename : null;
        if(req.body.type=='alumni'){
               
                const alumni=new Alumni({
                        name:req.body.name,
                        email:req.user.data,
                        department:req.body.department,
                        msc:req.body.msc,
                        phd:req.body.phd,
                        current_job:req.body.current_job,
                        current_company:req.body.current_company,
                        research_field:req.body.research_filed,
                        description:req.body.description,
                        photo:image,

                });
                alumni.save().then(
                        ()=>res.send({message:'successfully saved the profile'})

                ).catch(
                        (err)=>res.send({error:err})
                )
        }
        if(req.body.type=='student'){
               
                const student=new Student({
                        name:req.body.name,
                        email:req.user.data,
                        department:req.body.department,
                        interested_field:req.body.interested_field,
                        research_field : req.body.research_field,
                        participation_or_achievement:req.body.participation_or_achievement,
                        current_company:req.body.current_company,
                        project:req.body.project,
                        description:req.body.description,
                        photo:image,

                });
                student.save().then(
                        ()=>res.send({message:'successfully saved the profile'})

                ).catch(
                        (err)=>res.send({error:err})
                )
        }
        

})
router.get("/userprofile",authenticatedToken,async (req,res)=>{
        try{
                const users=await UserProfile.find();
                res.status(200).json({
                        message:'data loaded successfully',
                        data:users
                })
        }
        catch(error){
                res.status(500).json({error:error});

        }
})
module.exports=router;