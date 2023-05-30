import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";

const Product = ({id, timestamp, name, harga, kategori}) => {
    
    const {showAlert, setProduct} = useContext(ProductContext);
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
                    <IconButton>
                        <MoreVertIcon/>
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