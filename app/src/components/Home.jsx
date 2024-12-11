import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateProduct } from './CreateProduct';

export const Home = () => {

    const [products, setProducts] = useState()
    const [openCreateProduct, setOpenCreateProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/')
            setProducts(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5000/products/delete/${id}`)
        console.log(response)
        if (response.data?.success) {
            getAllProducts()
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", p: 2, gap: 2 }}>
                <Typography variant='h4' gutterBottom>Product E-commerce App</Typography>
                <Button variant="contained" color='secondary' onClick={() => { setOpenCreateProduct(!openCreateProduct) }}>Create Product</Button>
            </Box>
            {products?.length > 0 && products.map((product) => {
                return (
                    < Card key={product._id} sx={{ mx: 10, my: 3, p: 2, border: "1px solid gray" }} >
                        <CardHeader
                            title={product.name}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={product.image}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                Price : {product.price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant='contained' onClick={() => { setOpenCreateProduct(!openCreateProduct); setSelectedProduct(product) }}>Update Product</Button>
                            <Button variant='contained' sx={{ marginLeft: 4 }} onClick={() => { handleDelete(product._id) }}>Delete Product</Button>
                        </CardActions>
                    </Card >
                )
            })
            }
            {openCreateProduct && <CreateProduct product={selectedProduct} setSelectedProduct={setSelectedProduct} setOpenCreateProduct={setOpenCreateProduct} openCreateProduct={openCreateProduct} getAllProducts={getAllProducts} />}
        </>
    )
}