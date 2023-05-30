import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import { db } from "../../../firebase"
import { EmployeeContext } from "./EmployeeContext"

const EmployeeForm = () => {
    
    // snackbar
    const { showAlert, employee, setEmployee } = useContext(EmployeeContext);
    
    // button submit
    const onSubmit = async () => {

        //kondisi update
        if(employee?.hasOwnProperty('timestamp')){
            // lakukan update
            const docRef = doc(db, "employees", employee.id)
            const employeeUpdated = {...employee, timestamp:serverTimestamp()}
            updateDoc(docRef, employeeUpdated)
            setEmployee({ name:'', email:'', jabatan:'', telepon:'' })
            showAlert('success', `Employee with id ${docRef.id} is updated succesfully`)
        } else {
            const collectionRef = collection(db, "employees")
            const docRef = await addDoc(collectionRef, { ...employee, timestamp:serverTimestamp() })
            setEmployee({ name:'', email:'', jabatan:'', telepon:'' })
            showAlert('success', `Employee with id ${docRef.id} is added succesfully`)
        }
    }

    // detect input area
    const inputAreaRef = useRef();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setEmployee({ name:'', email:'', jabatan:'', telepon:'' })
            } else {
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    return (
        <div ref={inputAreaRef}>
            {/* <pre>{JSON.stringify(employee, null, '\t')}</pre> */}
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
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>{employee.hasOwnProperty('timestamp')?'Update Employee':'Add a new Employee'}</Button>
        </div>
    )
}

export default EmployeeForm