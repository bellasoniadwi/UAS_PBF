import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { MemberContext } from "./MemberContext";

const Member = ({id, timestamp, name, alamat, telepon, usia}) => {
    
    const {showAlert} = useContext(MemberContext);
    // fungsi delete
    const deleteMember = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "members", id);
        await deleteDoc(docRef);
        showAlert('error', `Member with id ${id} deleted successffully`);

    }

    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteMember(id, e)}>
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
                secondary={alamat}
            />

        </ListItem>
    )
}

export default Member