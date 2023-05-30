import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Product from './Product';
import { Alert, Container, Snackbar } from '@mui/material';
import ProductForm from './ProductForm';


const ProductDemo = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, "products")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setProducts(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])
    return (
        <Container maxWidth="sm">
            <ProductForm/>
            {products.map(products =>
                <Product key={products.id}
                    name={products.name}
                    kategori={products.kategori}
                    harga={products.harga}
                />
            )}
        </Container>
    );
};

export default ProductDemo;
