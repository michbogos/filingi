import './App.css';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import {Input, Button} from '@mui/material';
import { addDoc, collection, doc, getDocs, increment, updateDoc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App(props) {
  let [questions, setQuestions] = useState([])
  const [error, setError] = useState(false)
  let values = []
  let handleAnswer = (index)=>{
    let document = questions[index]
    let id = document.id
    let array = document.data().answers
    updateDoc(doc(props.db, "questions", id), {times_answered: increment(1), answers: [...array, values[index]]}).then(()=>{console.log("Updated data")})
  }
  let navigate = useNavigate()
  useEffect(()=>{
    getDocs(collection(props.db, "questions")).then((res)=>{setQuestions(res.docs);values=Array(res.docs.length).fill("")});
  }, [])
  return (
    <div className="App">
      {error ? <Alert severity="error">
        <AlertTitle>Alle Felder einfüllen</AlertTitle>
        <strong>Fülle bitte alle Felder ein, um fortzufahren</strong></Alert> : <></>}
      <Container class="content">
        <Stack gap={10}>
          <Typography variant='h3' textAlign={"center"}>Beantworte die Fragen!</Typography>
          <Stack gap={5}>
          {
            questions.map((element, index)=>{
              return <Stack>
                      <Typography variant="body1">{element.data().question}</Typography>
                      <Input onChange={(e)=>{values[index]=e.target.value}} className="answer" index={index} placeholder="Antwort"></Input>
                    </Stack>
              }
            )
          }
          </Stack>
          <Button onClick={()=>{
            setError(false)
            if(values.includes("") || values.includes(null) || values.includes(undefined)){
              setError(true)
            }
            else{
              try{
              let inputs = Array.from(document.getElementsByClassName("answer"));
              inputs.forEach(element=>handleAnswer(element.getAttribute("index")));
              let ids = [];
              questions.forEach((element, index)=>{ids.push(questions[index].id);})
              addDoc(collection(props.db, 'responses'), {questions:ids, answers:values})
              navigate("/add")
            }
            catch{
              setError(true)
            }
          }
            }}>Senden</Button>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
