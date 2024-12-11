import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

export const CreateProduct = ({ product = {}, setOpenCreateProduct, openCreateProduct, setSelectedProduct, getAllProducts }) => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        image: "",
        price: 0
    })
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if (product && Object.keys(product).length > 0) {
            setNewProduct(product)
            setIsUpdating(true)
        }
    }, [product])

    const handleSubmit = async () => {
        if (isUpdating) {
            try {
                const response = await axios.patch(`http://localhost:5000/products/update/${newProduct._id}`, { ...newProduct });
                console.log("Product updated:", response.data);
                handleClose()
                getAllProducts()
            } catch (error) {
                console.error("Error updating product:", error);
            }
        } else {
            try {
                const response = await axios.post("http://localhost:5000/products/create", { ...newProduct });
                console.log("Product created:", response.data);
                handleClose()
                getAllProducts()
            } catch (error) {
                console.error("Error creating product:", error);
            }
        }
    }

    const handleClose = () => {
        setOpenCreateProduct(false);
        setSelectedProduct({})
    }

    return (
        <>
            <Dialog
                open={openCreateProduct}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        margin: 4,
                        width: "60%",
                    }
                }}
                maxWidth="xl"
            >
                <DialogTitle>Create Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="Product Name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct?.name}
                        onChange={(e) => {
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }}
                    />
                    <TextField
                        required
                        id="name"
                        name="Product Image"
                        label="Product Image"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct?.image}
                        onChange={(e) => {
                            setNewProduct({ ...newProduct, image: e.target.value })
                        }}
                    />
                    <TextField
                        required
                        id="name"
                        name="Product Price"
                        label="Product Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newProduct?.price}
                        onChange={(e) => {
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}