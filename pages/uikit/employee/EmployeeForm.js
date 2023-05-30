import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../../../firebase"

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({ name:'', email:'', telepon:'', jabatan:'' })
    const onSubmit = async () => {
        const collectionRef = collection(db, "employees")
        const docRef = await addDoc(collectionRef, { ...employee, timestamp:serverTimestamp() })
        setEmployee({ name:'', email:'', jabatan:'', telepon:'' })
        alert(`Employee with id ${docRef.id} is added succesfully`)
       
    }
    return (
        <div>
            <TextField fullWidth label="Name" margin="normal"
            value={employee.name} onChange={e => setEmployee({...employee, name:e.target.value})}
            />
            <TextField fullWidth label="Email" margin="normal"
            value={employee.email} onChange={e => setEmployee({...employee, email:e.target.value})}
            />
            <TextField fullWidth label="Telepon" margin="normal"
            value={employee.telepon} onChange={e => setEmployee({...employee, telepon:e.target.value})}
            />
            <TextField fullWidth label="Jabatan" margin="normal"
            value={employee.jabatan} onChange={e => setEmployee({...employee, jabatan:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>Add a New Employee</Button>
        </div>
    )
}

export default EmployeeForm