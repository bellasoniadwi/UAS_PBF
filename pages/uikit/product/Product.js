import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { useRouter } from "next/router";

const Product = ({id, timestamp, name, harga, kategori}) => {
    
    const {showAlert, setProduct} = useContext(ProductContext);
    // menuju detail
    const router = useRouter();
    //fungsi link to detail
    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/pages/detail/products/${id}`)
    }
    // fungsi delete
    const deleteProduct = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        showAlert('error', `Product with id ${id} deleted successffully`);

    }

    return (
        <ListItem onClick={() => setProduct({id, name, harga, kategori, timestamp})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteProduct(id, e)}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton onClick={e => seeMore(id, e)}>
                        <RemoveRedEyeIcon/>
                    </IconButton>
                </>
            }
        >
            <ListItemText
                primary={name}
                secondary={harga}
            />

        </ListItem>
    )
}

export default Product