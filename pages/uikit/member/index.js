import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Member from './member';
import { Alert, Container, Snackbar } from '@mui/material';
import MemberForm from './MemberForm';


const MemberDemo = () => {
    const [members, setMembers] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, "members")

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMembers(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;

    }, [])
    return (
        <Container maxWidth="sm">
            <MemberForm/>
            {members.map(members =>
                <Member key={members.id}
                    name={members.name}
                    alamat={members.alamat}
                    usia={members.usia}
                    telepon={members.telepon}
                />
            )}
        </Container>
    );
};

export default MemberDemo;
