import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export default function StatsPage(props) {
    const [q, setQuestions] = useState([])
    const [r, setResponses] = useState([])
    useEffect(()=>{
        getDocs(collection(props.db, "questions")).then((res)=>{
            setQuestions(res.docs.map((element)=>{return element.data()}))
        })
        getDocs(collection(props.db, "responses")).then((res)=>{
            setResponses(res.docs.map((element)=>{return element.data()}))
        })
    }, [])
    return (
        <div>
            {JSON.stringify({questions:q, responses:r})}
        </div>
    )
}
