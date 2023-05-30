import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Transaction from './Transaction';
import { Alert, Container, Snackbar } from '@mui/material';
import TransactionForm from './TransactionForm';


const TransactionDemo = () => {
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, "transactions")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTransactions(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])
    return (
        <Container maxWidth="sm">
            <TransactionForm/>
            {transactions.map(transactions =>
                <Transaction key={transactions.id}
                    name={transactions.name}
                    product={transactions.product}
                    total={transactions.total}
                />
            )}
        </Container>
    );
};

export default TransactionDemo;
