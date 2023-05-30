import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";

const Employee = ({id, timestamp, name, email, telepon, jabatan}) => {

    const {showAlert} = useContext(EmployeeContext);
    // fungsi delete
    const deleteEmployee = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "employees", id);
        await deleteDoc(docRef);
        showAlert('error', `Employee with id ${id} deleted successffully`);

    }
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteEmployee(id, e)}>
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
                secondary={jabatan}
            />

        </ListItem>
    )
}

export default Employee