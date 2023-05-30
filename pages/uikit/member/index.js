import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Member from './member';
import { Alert, Container, Snackbar } from '@mui/material';
import MemberForm from './MemberForm';
import { MemberContext } from './MemberContext';


const MemberDemo = () => {
    const [members, setMembers] = useState([])

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
        const collectionRef = collection(db, "members")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMembers(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])

    return (
        <MemberContext.Provider value={{ showAlert }}>
            <Container maxWidth="sm">
                <MemberForm/>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
                </Snackbar>
                {members.map(members =>
                    <Member key={members.id}
                        name={members.name}
                        alamat={members.alamat}
                        usia={members.usia}
                        telepon={members.telepon}
                    />
                )}
            </Container>
        </MemberContext.Provider>
    );
};

export default MemberDemo;
