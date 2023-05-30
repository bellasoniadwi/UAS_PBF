import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../../../firebase"

const ProductForm = () => {
    const [product, setProduct] = useState({ name:'', harga:0, kategori:'' })
    const onSubmit = async () => {
        const collectionRef = collection(db, "products")
        const docRef = await addDoc(collectionRef, { ...product, timestamp:serverTimestamp() })
        setProduct({ name:'', harga:0, kategori:'' })
        alert(`Product with id ${docRef.id} is added succesfully`)
       
    }
    return (
        <div>
            <TextField fullWidth label="Name" margin="normal"
            value={product.name} onChange={e => setProduct({...product, name:e.target.value})}
            />
            <TextField fullWidth label="Harga" margin="normal"
            value={product.harga} onChange={e => setProduct({...product, harga:e.target.value})}
            />
            <TextField fullWidth label="Kategori" margin="normal"
            value={product.kategori} onChange={e => setProduct({...product, kategori:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>Add a New Product</Button>
        </div>
    )
}

export default ProductForm