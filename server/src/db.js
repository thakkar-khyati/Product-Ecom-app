import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Mongoose database connected successfully")
    }).catch(() => {
        console.log("Error while connecting to mongoose server: ", error)
        process.exit(1)
    })
}