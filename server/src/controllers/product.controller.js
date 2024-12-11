import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error getting all products: ", error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.image || !product.price) {
        res.status(400).json({ message: "Please provide all fields" })
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        return res.status(200).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error creating a product: ", error.message)
        return res.status(500).json({ success: false, message: "Server error." })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted" })
    } catch (error) {
        console.log("Error deleting product: ", error)
        res.status(500).json({ success: false, message: "Server error." })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
        await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, message: "Product updated successfully" })
    } catch (error) {
        console.log("Error updating product: ", error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}