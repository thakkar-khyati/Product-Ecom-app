import express from "express"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.get("/", getAllProducts)

productRouter.post("/create", createProduct)

productRouter.delete("/delete/:id", deleteProduct)

productRouter.patch("/update/:id", updateProduct)

export default productRouter