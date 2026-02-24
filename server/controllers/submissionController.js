import { z } from "zod";
import { Submission } from "../models/submission.js";

export const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  age: z.preprocess((val) => {
    if (typeof val === "string") {
      const s = val.trim();
      if (s === "") return undefined;
      const n = Number(s);
      return Number.isFinite(n) ? n : val;
    }
    return val;
  }, z.number().int().min(1).optional()),
  gender: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  country: z.string().optional(),
  about: z.string().optional(),
  agree: z.boolean(),
  qualification: z.string().optional(),
  institution: z.string().optional(),
  gradYear: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  experience: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

export const submitForm = async (req, res) => {
  try {
    const validated = formSchema.parse(req.body);
    console.log("🚀 ~ submitForm ~ validated:", validated);

    const existing = await Submission.findOne({
      email: validated.email,
    });
    if (existing) {
      return res
        .status(409)
        .json({ error: "Already submitted with this email" });
    }

    const doc = new Submission({
      fullName: validated.fullName,
      email: validated.email,
      age: validated.age,
      gender: validated.gender,
      hobbies: validated.hobbies || [],
      country: validated.country,
      about: validated.about,
      agree: validated.agree,
      qualification: validated.qualification,
      institution: validated.institution,
      gradYear: validated.gradYear,
      company: validated.company,
      jobTitle: validated.jobTitle,
      experience: validated.experience,
      linkedin: validated.linkedin,
      website: validated.website,
    });

    const response = await doc.save();
    console.log("🚀 ~ submitForm ~ response:", response);

    res.json({ success: true, id: doc._id });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate entry" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
