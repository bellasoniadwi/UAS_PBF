import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../../../firebase"
import { MemberContext } from "./MemberContext"

const MemberForm = () => {
    const [member, setMember] = useState({ name:'', alamat:'', telepon:'', usia:0 })
    // snackbar
    const { showAlert } = useContext(MemberContext);
    // button submit
    const onSubmit = async () => {
        const collectionRef = collection(db, "members")
        const docRef = await addDoc(collectionRef, { ...member, timestamp:serverTimestamp() })
        setMember({ name:'', alamat:'', usia:0, telepon:'' })
        showAlert('success', `Member with id ${docRef.id} is added succesfully`)
       
    }
    
    return (
        <div>
            <TextField fullWidth label="Name" margin="normal"
            value={member.name} onChange={e => setMember({...member, name:e.target.value})}
            />
            <TextField fullWidth label="Alamat" margin="normal"
            value={member.alamat} onChange={e => setMember({...member, alamat:e.target.value})}
            />
            <TextField fullWidth label="Telepon" margin="normal"
            value={member.telepon} onChange={e => setMember({...member, telepon:e.target.value})}
            />
            <TextField fullWidth label="Usia" margin="normal"
            value={member.usia} onChange={e => setMember({...member, usia:e.target.value})}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>Add a New Member</Button>
        </div>
    )
}

export default MemberForm