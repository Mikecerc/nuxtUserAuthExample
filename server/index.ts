import mongoose from "mongoose";
export default async () => {
    try {
      const runtimeConfig = useRuntimeConfig();
      await mongoose.connect(runtimeConfig.dbAuth);
      console.log("DB connection established.");
    } catch (err) {
      console.error("DB connection failed.", err);
    }
  };