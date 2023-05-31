import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { useRouter } from "next/router";

const Employee = ({id, timestamp, name, email, telepon, jabatan}) => {

    const {showAlert, setEmployee} = useContext(EmployeeContext);
    // menuju detail
    const router = useRouter();
    // fungsi delete
    const deleteEmployee = async (id, e)=>{
        e.stopPropagation();
        const docRef = doc(db, "employees", id);
        await deleteDoc(docRef);
        showAlert('error', `Employee with id ${id} deleted successffully`);

    }
    //fungsi link to detail
    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/pages/detail/employees/${id}`)
    }
      
    return (
        <ListItem onClick={() => setEmployee({id, name, email, telepon, jabatan, timestamp})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteEmployee(id, e)}>
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
                secondary={jabatan}
            />

        </ListItem>
    )
}

export default Employee