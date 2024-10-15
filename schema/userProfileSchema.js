const mongoose=require('mongoose');
const {Schema}=mongoose;

const userProfileSchema=new Schema({
        name:{
                type:String,
                required:true,
        },
        email:{
                type:String,
                required:true,
        },
        department:{
                type:String,
                required:true,
        },
        userType: {
                type: String,
                required: true,
                enum: ['Student', 'Alumni', 'Company'], 
              }
},{discriminatorKey:"userType",collection:"userProfiles"})
const UserProfile=mongoose.model('UserProfile',userProfileSchema);

const Student=UserProfile.discriminator('Student',new Schema({
        interested_field:String,
        research_field:String,
        participation_or_achievement:String,
        project:String,
        description:String,
        photo:String,
}));
const alumniSchema=new Schema({
        msc:String,
        phd:String,
        current_job:String,
        current_company:String,
        research_field:String,
        description:String,
        photo:String,
        
});
const Alumni=UserProfile.discriminator('Alumni',alumniSchema);
module.exports={UserProfile,Student,Alumni};