import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGO_DB_URL = process.env.MONGO_DB_URL;

export const dbConnection = async () => {
    console.info("connecting...");
    try {
        await mongoose.connect(MONGO_DB_URL as string);
        console.info("connected to MongoDB");
    } catch (error) {
        console.error("error connecting to MongoDB:", error.message);
    }
};
