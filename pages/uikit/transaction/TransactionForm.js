import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { useContext, useState, useRef, useEffect } from "react"
import { db } from "../../../firebase"
import { TransactionContext } from "./TransactionContext"

const TransactionForm = () => {
    
    // snackbar
    const { showAlert, transaction, setTransaction } = useContext(TransactionContext);

    // button submit
    const onSubmit = async () => {

        //kondisi update
        if(transaction?.hasOwnProperty('timestamp')){
            // lakukan update
            const docRef = doc(db, "transactions", transaction.id)
            const transactionUpdated = {...transaction, timestamp:serverTimestamp()}
            updateDoc(docRef, transactionUpdated)
            setTransaction({ name:'', total:0, product:'' })
            showAlert('success', `Transaction with id ${docRef.id} is updated succesfully`)
        } else {
            const collectionRef = collection(db, "transactions")
            const docRef = await addDoc(collectionRef, { ...transaction, timestamp:serverTimestamp() })
            setTransaction({ name:'', total:0, product:'' })
            showAlert('success', `Transaction with id ${docRef.id} is added succesfully`)
        }
       
    }

    // detect input area
    const inputAreaRef = useRef();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setTransaction({ name:'', total:0, product:'' })
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
            <TextField fullWidth label="Name" margin="normal"
            value={transaction.name} onChange={e => setTransaction({...transaction, name:e.target.value})}
            />
            <TextField fullWidth label="Product" margin="normal"
            value={transaction.product} onChange={e => setTransaction({...transaction, product:e.target.value})}
            />
            <TextField fullWidth label="Total" margin="normal"
            value={transaction.total} onChange={e => setTransaction({...transaction, total:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>{transaction.hasOwnProperty('timestamp')?'Update Transaction':'Add a new Transaction'}</Button>
        </div>
    )
}

export default TransactionForm