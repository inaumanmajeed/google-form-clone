import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/google_form_clone";

export default async function connectDB() {
  return mongoose.connect(MONGODB_URI, { dbName: "google_form_clone" });
}
