import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Employee from './employee';
import { Alert, Container, Snackbar } from '@mui/material';
import EmployeeForm from './EmployeeForm';


const EmployeeDemo = () => {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, "employees")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setEmployees(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])
    return (
        <Container maxWidth="sm">
            <EmployeeForm/>
            {employees.map(employee =>
                <Employee key={employee.id}
                    name={employee.name}
                    email={employee.email}
                    jabatan={employee.jabatan}
                    telepon={employee.telepon}
                />
            )}
        </Container>
    );
};

export default EmployeeDemo;
