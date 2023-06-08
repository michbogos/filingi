import { Typography, Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

export default function StatsPage(props) {
    const [q, setQuestions] = useState([])
    const [r, setResponses] = useState([])
    useEffect(()=>{
        getDocs(collection(props.db, "questions")).then((res)=>{
            setQuestions(res.docs)
        })
        getDocs(collection(props.db, "responses")).then((res)=>{
            setResponses(res.docs)
        })
    }, [])

    let download = ()=>{
        const workbook = XLSX.utils.book_new();
        let worksheet = XLSX.utils.aoa_to_sheet(q.map((_, index)=>{return [index, q[index].id, q[index].data().question, q[index].data().times_answered]}))
        let worksheet2 = XLSX.utils.aoa_to_sheet(q.map((_, index)=>{return [q[index].id, ...q[index].data().answers]}))
        let responses = []
        for(let i = 0; i < r.length; i++){
            for(let j = 0; j < r[i].data().answers.length; j++){
                responses.push([r[i].id, r[i].data().questions[j], r[i].data().answers[j]])
            }
        }
        let worksheet3 = XLSX.utils.aoa_to_sheet(responses)
        XLSX.utils.book_append_sheet(workbook, worksheet, "Fragen")
        XLSX.utils.book_append_sheet(workbook, worksheet2, "Frage_Antwort")
        XLSX.utils.book_append_sheet(workbook, worksheet3, "Antworten")
        XLSX.writeFile(workbook, "Umfrage_Daten.xlsx")
    }
    return (
        <Stack>
            <Typography variant="h3">Daten</Typography>
            <Box padding={2} border={2} borderRadius={3}>
                {JSON.stringify({questions:q.map(element=>element.data()), responses:r.map(element=>element.data())})}
            </Box>
            <Button onClick={download}>Download Excel</Button>
        </Stack>
    )
}
