import mongoose from "mongoose";

let isConnected = false;

export const dbconnection = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Restuarant",
        });
        isConnected = true;
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Error occurred during database connection:", err);
        throw err;
    }
};