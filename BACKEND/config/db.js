import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads variables from .env

const mongoUri = process.env.MONGO_URI;

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};