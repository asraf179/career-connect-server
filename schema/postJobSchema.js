const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobCreatorEmail: {
      type:String, // Referencing the UserProfile schema
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    remote_or_onsite: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"],
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    job_responsibility: {
      type: String,
      required: true,
    },
    educational_requirements: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    contact_information: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
