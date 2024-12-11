import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import productRouter from "./src/routes/product.routes.js";
import { connectDb } from "./src/db.js";
dotenv.config()

const app = express()
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3000/",
        ],
        method: ["GET", "POST", "PATCH", "DELETE"]
    })
)
const port = process.env.PORT || 5000

app.use(express.json())

app.use('/products', productRouter)


app.listen(port, () => {
    connectDb()
    console.log("server running on ", 5000)
})