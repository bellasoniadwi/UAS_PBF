import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Employee from './employee';
import { Alert, Container, Snackbar } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import { EmployeeContext } from './EmployeeContext';


const EmployeeDemo = () => {
    const [employees, setEmployees] = useState([])

    // snackbar
    const [open, setOpen] = useState(false)
    const [alertType, setAlertType] = useState("success")
    const [alertMessage, setAlertMessage] = useState("")
    const showAlert = (type, msg) => {
        setAlertType(type);
        setAlertMessage(msg);
        setOpen(true);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };


    // create - firebase
    useEffect(() => {
        const collectionRef = collection(db, "employees")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setEmployees(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])

    return (
        <EmployeeContext.Provider value={{ showAlert }}>
            <Container maxWidth="sm">
                <EmployeeForm/>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
                </Snackbar>
                {employees.map(employee =>
                    <Employee key={employee.id}
                        name={employee.name}
                        email={employee.email}
                        jabatan={employee.jabatan}
                        telepon={employee.telepon}
                    />
                )}
            </Container>
        </EmployeeContext.Provider>
    );
};

export default EmployeeDemo;
