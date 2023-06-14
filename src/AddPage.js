import { Alert, Button } from '@mui/material'
import { Typography, Input } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'


export default function AddPage(props) {
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(false);
  return (
    <Container>
        <Stack gap={2}>
            {visible ? <Alert severity='success'>Frage abgeschickt</Alert>:<></>}
            <Typography textAlign={"center"} variant="h1">Gratulation!</Typography>
            <Typography textAlign={"center"} variant="h4">Du hast die Umfrage geschafft</Typography>
            <Typography textAlign={"center"} variant="h5">Jetzt darfst du deine eigene Frage erstellen</Typography>
            <Typography textAlign={"center"} variant="h5">Bitte keine persönlichen Fragen</Typography>
            <Input onChange={(e)=>{setValue(e.target.value)}} id="question_input" placeholder="Deine Frage..."></Input>
            <Button onClick={!visible ? ()=>{setVisible(true);addDoc(collection(props.db, "questions"), {answers:[], question:value, times_answered:0})} : ()=>{}}>Senden!</Button>
        </Stack>
    </Container>
  )
}
