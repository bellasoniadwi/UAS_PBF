import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../../../firebase"

const TransactionForm = () => {
    const [transaction, setTransaction] = useState({ name:'', total:0, transaction:'' })
    const onSubmit = async () => {
        const collectionRef = collection(db, "transactions")
        const docRef = await addDoc(collectionRef, { ...transaction, timestamp:serverTimestamp() })
        setTransaction({ name:'', harga:0, kategori:'' })
        alert(`Transaction with id ${docRef.id} is added succesfully`)
       
    }
    return (
        <div>
            <TextField fullWidth label="Name" margin="normal"
            value={transaction.name} onChange={e => setTransaction({...transaction, name:e.target.value})}
            />
            <TextField fullWidth label="Product" margin="normal"
            value={transaction.product} onChange={e => setTransaction({...transaction, product:e.target.value})}
            />
            <TextField fullWidth label="Total" margin="normal"
            value={transaction.total} onChange={e => setTransaction({...transaction, total:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>Add a New Transaction</Button>
        </div>
    )
}

export default TransactionForm