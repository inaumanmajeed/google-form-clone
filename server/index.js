import express from "express";
import cors from "cors";
import connectDB from "./db/mongo.js";
import submissionsRouter from "./routes/submissions.js";

const PORT = process.env.PORT || 5010;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", submissionsRouter);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
