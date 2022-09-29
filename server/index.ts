import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default async () => {
    try {
      await mongoose.connect("mongodb+srv://nuxt:pass@cluster-1.ma70x.mongodb.net/NuxtAuth?retryWrites=true&w=majority");
      console.log("DB connection established.");
    } catch (err) {
      console.error("DB connection failed.", err);
    }
  };