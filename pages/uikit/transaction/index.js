import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Transaction from './Transaction';
import { Alert, Container, Snackbar } from '@mui/material';
import TransactionForm from './TransactionForm';
import { TransactionContext } from './TransactionContext';


const TransactionDemo = () => {
    const [transactions, setTransactions] = useState([])

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
        const collectionRef = collection(db, "transactions")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTransactions(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])
    
    return (
        <TransactionContext.Provider value={{ showAlert }}>
        <Container maxWidth="sm">
            <TransactionForm/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            {transactions.map(transactions =>
                <Transaction key={transactions.id}
                    id={transactions.id}
                    name={transactions.name}
                    product={transactions.product}
                    total={transactions.total}
                />
            )}
        </Container>
        </TransactionContext.Provider>
    );
};

export default TransactionDemo;