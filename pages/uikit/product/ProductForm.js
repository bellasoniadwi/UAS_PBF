import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { useContext, useState, useRef, useEffect } from "react"
import { db } from "../../../firebase"
import { ProductContext } from './ProductContext';

const ProductForm = () => {
    
    // snackbar
    const { showAlert, product, setProduct } = useContext(ProductContext);

    // button submit
    const onSubmit = async () => {
        
        //kondisi update
        if(product?.hasOwnProperty('timestamp')){
            // lakukan update
            const docRef = doc(db, "products", product.id)
            const productUpdated = {...product, timestamp:serverTimestamp()}
            updateDoc(docRef, productUpdated)
            setProduct({ name:'', harga:0, kategori:'' })
            showAlert('success', `Product with id ${docRef.id} is updated succesfully`)
        } else {
            const collectionRef = collection(db, "products")
            const docRef = await addDoc(collectionRef, { ...product, timestamp:serverTimestamp() })
            setProduct({ name:'', harga:0, kategori:'' })
            showAlert('success', `Product with id ${docRef.id} is added succesfully`)
        }
       
    }

    // detect input area
    const inputAreaRef = useRef();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setProduct({ name:'', harga:0, kategori:'' })
            } else {
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    return (
        <div ref={inputAreaRef}>
            <TextField fullWidth label="Name" margin="normal"
            value={product.name} onChange={e => setProduct({...product, name:e.target.value})}
            />
            <TextField fullWidth label="Harga" margin="normal"
            value={product.harga} onChange={e => setProduct({...product, harga:e.target.value})}
            />
            <TextField fullWidth label="Kategori" margin="normal"
            value={product.kategori} onChange={e => setProduct({...product, kategori:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>{product.hasOwnProperty('timestamp')?'Update Product':'Add a new Product'}</Button>
        </div>
    )
}

export default ProductForm