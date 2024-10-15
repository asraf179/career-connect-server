const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const job = require("./schema/postJobSchema");
const{upload}=require("./storage");
const authenticatedToken=require('./authenticatedToken');
const AppliedJob=require('./schema/appliedJobSchema')



require('dotenv').config();


router.post("/postJob",authenticatedToken,upload.single('logo'),async(req,res)=>{
        console.log(req.body.job_title);
        console.log(req.body.contact_information)
        const logo=req.file ? req.file.filename : null;
        try{
                const newJob = new job({
                        jobCreatorEmail:req.user.data,
                        logo:logo ,
                        job_title: req.body.job_title,
                        company_name: req.body.company_name,
                        remote_or_onsite: req.body.remote_or_onsite, // Ensure it matches one of the enum values
                        location: req.body.location,
                        job_type: req.body.job_type, // Ensure it matches one of the enum values
                        salary: req.body.salary,
                        job_description: req.body.job_description,
                        job_responsibility:req.body.job_responsibility,
                        educational_requirements: req.body.educational_requirements,
                        experience:req.body.experience,
                        contact_information: {
                          phone: req.body.phone,
                          email: req.body.email,
                          address:req.body.address,
                        }
                      });
                      const savedJob = await newJob.save();
                      res.send({data:savedJob,message:"your job list saved successfully"});
                      console.log("done");


        }
        catch(err)
        {
                console.log(err);
                res.status(500).json({error:err});
        }
})
router.get("/postJob",authenticatedToken,async(req,res)=>{
        console.log("yes");
        console.log(req.user.data)
        const Email=req?.user?.data;
        try{
                console.log("sjhbd");
                const createdJobs=await job.find({jobCreatorEmail:Email});
                res.status(200).json({
                        message:'data loaded successfully',
                        data:createdJobs
                })
                console.log(createdJobs)
        }
        catch(error){
                console.log(error)
                res.status(500).json({error:error});

        }
})

router.get("/jobs",authenticatedToken,async(req,res)=>{
        console.log("hit");
        try{
                console.log("before")

                const Jobs= await job.find();
                console.log("after")
                console.log(Jobs)
                res.send({data:Jobs})
                console.log('allJObs');
        }
        catch(error){
                res.send({error:error})
        }
})
router.post("/appliedJob",async(req,res)=>{
       try{
        const appliedJob = await AppliedJob.findOneAndUpdate(
                { user: req.body.userId }, // Search by user ID
                { $push: { jobs: req.body.jobId } }, // Add the new jobId to the jobs array
                { new: true, upsert: true } // Create a new document if it doesn't exist (upsert option)
              );
              res.send({appliedJob:appliedJob,message:"Successfully Applied"})
       }
       catch(error){
        res.send({error:error})
       }
})
router.get("/appliedJob",async(req,res)=>{
        const{userID}=req.query;
      
        try {
                const appliedJob = await AppliedJob.findOne({ user: userID })
                  .populate('jobs');
           
                  res.send({data:appliedJob})
            
              } catch (err) {
            
                res.send({error:err})
}})
router.get("/applicantsJob",async(req,res)=>{
        const{jobId}=req.query;
     console.log(jobId);
        try {
                const applicants = await AppliedJob.find({ jobs: jobId })
                  .populate('user'); // Populate the user details
            
                console.log('Applicants for job:', applicants);
                res.send({data:applicants})
              } catch (err) {
                console.error(err);
                res.send({error:err})
              }
})

module.exports = router;