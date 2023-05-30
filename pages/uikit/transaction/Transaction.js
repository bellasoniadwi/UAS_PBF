import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";

const Transaction = ({id, timestamp, name, total, product}) => {

    const {showAlert} = useContext(TransactionContext);
    // fungsi delete
    const deleteTransaction = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "transactions", id);
        await deleteDoc(docRef);
        showAlert('error', `Transaction with id ${id} deleted successffully`);

    }
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteTransaction(id, e)}>
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
                secondary={total}
            />

        </ListItem>
    )
}

export default Transaction