import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import { useRouter } from "next/router";

const Transaction = ({id, timestamp, name, total, product}) => {

    const {showAlert,setTransaction} = useContext(TransactionContext);
    // menuju detail
    const router = useRouter();
    //fungsi link to detail
    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/pages/detail/transactions/${id}`)
    }
    // fungsi delete
    const deleteTransaction = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "transactions", id);
        await deleteDoc(docRef);
        showAlert('success', `Transaction with id ${id} deleted successffully`);

    }
      
    return (
        <ListItem onClick={() => setTransaction({id, name, total, product, timestamp})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteTransaction(id, e)}>
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
                secondary={total}
            />

        </ListItem>
    )
}

export default Transaction