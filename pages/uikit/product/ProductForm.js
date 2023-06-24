import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from "@firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { ProductContext } from "./ProductContext";
import axios from "../../../lib/axios";

export default function ProductForm() {
  // snackbar
  const { showAlert, product, setProduct } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [fireData, setFireData] = useState([]);
  const collectionRef = collection(db, "products");

  useEffect(() => {
    getData();
  }, []);

  // button submit
  const addData = (event) => {
    event.preventDefault();
    if (product?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "products", product.id);
      const productUpdated = { ...product, timestamp: serverTimestamp() };
      updateDoc(docRef, productUpdated);
      setProduct({ name: "", harga: "", kategori: "" });
      showAlert(
        "success",
        `Product with id ${docRef.id} is updated succesfully`
      );
      axios.put(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/products/${timestamp}`,
        {
          ...product,
        }
      );
    } else {
      addDoc(
        collectionRef,
        {
          ...product,
          timestamp: serverTimestamp(),
        },
        setProduct({ name: "", harga: "", kategori: "" }),
        showAlert("success", `Product is added succesfully`)
      ).then(() => {
        axios
          .post("http://localhost:8000/api/products", {
            ...product,
          })
          .then((response) => {
            showAlert("success", `Product is succesfully added to MySQL`);
            getData();
            setName("");
            setHarga("");
            setKategori("");
          })
          .catch((err) => {
            console.error(err);
            showAlert("error", `Product can't be added to MySQL`);
          });
      });
    }
  };

  const getData = async () => {
    await getDocs(collectionRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  // detect input area
  const inputAreaRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setProduct({ name: "", harga: "", kategori: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      <form method="POST" onSubmit={addData}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Harga"
          margin="normal"
          name="harga"
          id="harga"
          value={product.harga}
          onChange={(e) => setProduct({ ...product, harga: e.target.value })}
        />
        <TextField
          fullWidth
          label="Kategori"
          margin="normal"
          name="kategori"
          id="kategori"
          value={product.kategori}
          onChange={(e) => setProduct({ ...product, kategori: e.target.value })}
        />
        <Button
          onClick={addData}
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          {product.hasOwnProperty("timestamp")
            ? "Update Product"
            : "Add a new Product"}
        </Button>
      </form>
    </div>
  );
}
