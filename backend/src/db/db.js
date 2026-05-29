import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  
    console.log(`DB Connected \n DB Host: ${connectionInstance.connection.host}`);
  
  } catch (error) {
    console.error("DB connection failed", error)
    process.exit(1);
  }

};

export default connectDB;