import mongoose from "mongoose";

const dbConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("Mongoose Url Not Found");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db Connected")
    }
    catch (err) {
        console.log(err);
    }
}


export default dbConnection;