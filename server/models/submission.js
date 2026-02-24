import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number },
    gender: { type: String },
    hobbies: { type: [String], default: [] },
    country: { type: String },
    about: { type: String },
    agree: { type: Boolean },
    qualification: { type: String },
    institution: { type: String },
    gradYear: { type: String },
    company: { type: String },
    jobTitle: { type: String },
    experience: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },
  { timestamps: true },
);

export const Submission = mongoose.model("Submission", submissionSchema);
