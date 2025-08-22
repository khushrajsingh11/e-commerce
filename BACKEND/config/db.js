import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://khushrajsingh13s:UuS5McGxANe2mL0v@cluster0.k3jow.mongodb.net/food-del');
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
