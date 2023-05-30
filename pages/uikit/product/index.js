import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Product from "./Product";
import { Alert, Container, Snackbar } from "@mui/material";
import ProductForm from "./ProductForm";
import { ProductContext } from "./ProductContext";
import Grid from "@mui/material/Grid";

const ProductDemo = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", harga: "", kategori: "" });

  // snackbar
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // create - firebase
  useEffect(() => {
    const collectionRef = collection(db, "products");

    const q = query(collectionRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <div className="grid p-fluid">
      <ProductContext.Provider value={{ showAlert, product, setProduct }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="card">
                <ProductForm />
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={alertType}
                    sx={{ width: "100%" }}
                  >
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </div>
            </Grid>
            <Grid item xs={6}>
              {products.map((products) => (
                <Product
                  key={products.id}
                  id={products.id}
                  name={products.name}
                  kategori={products.kategori}
                  harga={products.harga}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </ProductContext.Provider>
    </div>
  );
};

export default ProductDemo;
