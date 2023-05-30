import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { useContext, useState, useRef, useEffect } from "react"
import { db } from "../../../firebase"
import { MemberContext } from "./MemberContext"

const MemberForm = () => {

    // snackbar
    const { showAlert, member, setMember } = useContext(MemberContext);

    // button submit
    const onSubmit = async () => {

        //kondisi updates
        if(member?.hasOwnProperty('timestamp')){
            // lakukan update
            const docRef = doc(db, "members", member.id)
            const memberUpdated = {...member, timestamp:serverTimestamp()}
            updateDoc(docRef, memberUpdated)
            setMember({ name:'', alamat:'', usia:0, telepon:'' })
            showAlert('success', `Member with id ${docRef.id} is updated succesfully`)
        } else {
            const collectionRef = collection(db, "members")
            const docRef = await addDoc(collectionRef, { ...member, timestamp:serverTimestamp() })
            setMember({ name:'', alamat:'', usia:0, telepon:'' })
            showAlert('success', `Member with id ${docRef.id} is added succesfully`)
        }
    }

    // detect input area
    const inputAreaRef = useRef();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setMember({ name:'', alamat:'', usia:0, telepon:'' })
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
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>{member.hasOwnProperty('timestamp')?'Update Member':'Add a new Member'}</Button>
        </div>
    )
}

export default MemberForm