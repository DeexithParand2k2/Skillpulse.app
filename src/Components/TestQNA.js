import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, TextField, Button } from '@mui/material';
import TestTitleCard from './TestTitleCard';

import { cnEntryTest,dbmsEntryTest,osEntryTest } from '../Data/QNA Entry Tests/ALL_ENTRY_TEST';
import { cnExitTest,dbmsExitTest,osExitTest } from '../Data/QNA Entry Tests/ALL_EXIT_TEST'; 
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'
import { useQuery, useQueryClient } from 'react-query';
import ErrorLoader from './ErrorLoader';
import Spinner from './Spinner';

var globalFinalAns = cnEntryTest

const getquestionSet = (moduleName,subjectName,testType) =>{


  if(testType === 'entryTest'){

    var finalans = [];

    switch(subjectName) {
      case 'cn':
        finalans = cnEntryTest; 
        globalFinalAns = "cnEntryTest";
        break;
      case 'dbms':
        finalans = dbmsEntryTest; 
        globalFinalAns = "dbmsEntryTest";
        break;
      case 'os':
        finalans = osEntryTest; 
        globalFinalAns = "osEntryTest";
        break;
      default:
        finalans = [];
    }
  }
  
  if(testType === 'exitTest'){
    switch(subjectName) {
      case 'cn':
        finalans = cnExitTest;
        globalFinalAns = "cnExitTest"; 
        break;
      case 'dbms':
        finalans = dbmsExitTest; 
        globalFinalAns = "dbmsExitTest";
        break;
      case 'os':
        finalans = osExitTest; 
        globalFinalAns = "osExitTest";
        break;
      default:
        finalans = [];
    }
  }

  return finalans;
}


const TestQNA = () => {

  const { moduleName, subjectName, testType } = useParams();

  const [questionSet,setQuestionSet] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();


  function makeReqObject(questionSet){

    let finalansRequest = globalFinalAns;
  
    var userAnswerObject = {}, tempUserAnswerObject = {}
  
    var questionNumber = 1;
  
    for (const entry of questionSet) {
      const { user_answer } = entry;
      tempUserAnswerObject[questionNumber++] = user_answer;
    }
  
    //console.log('what is this',finalansRequest)
  
    userAnswerObject = {
      ["UserAnswer"] : {
        [finalansRequest] : tempUserAnswerObject
      }
    }
  
    //console.log('give me object ', userAnswerObject);
  
    return userAnswerObject;
  }

  
  const fetchData = async () => {
    try {
      var reqObj = makeReqObject(questionSet);

      console.log('request object I need',reqObj)

      const response = await fetch('http://127.0.0.1:8000/api/GetRating/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + sessionStorage.getItem('myToken'),
        },
        body: JSON.stringify(reqObj)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error
    }
  }

  const { data, isFetching, isError } = useQuery(
    ['getQNATestResults'+moduleName+subjectName+testType],
    () => fetchData(),
    {
      enabled : buttonClicked,
      onSuccess(data){
        console.log('successfully fetched',data)
        navigate('/dashboard')
        setButtonClicked(false);
      },
      onError(error){
        navigate('/dashboard')
        setButtonClicked(false)
      },
      staleTime: Infinity
    }
  )

  useEffect(()=>{

    //on unMount
    return () => {
      setQuestionSet(getquestionSet("","",""));
      queryClient.invalidateQueries(['getQNATestResults'+moduleName+subjectName+testType]);
        // Reset answers state
    };
  },[])

  useEffect(()=>{
    console.log('params passed : ',moduleName,subjectName,testType);
    console.log('check em now',buttonClicked)
    //update the questionSet set
    setQuestionSet(getquestionSet(moduleName,subjectName,testType));
  },[buttonClicked])

  



  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...questionSet];
    updatedAnswers[index].user_answer = value;
    setQuestionSet(updatedAnswers);
  };

  const handleSubmit = () => {
    setButtonClicked(true);
  };

  if(isError){
    return <ErrorLoader />
  }

  if(isFetching){
    return <Spinner />
  }

  return (
    <>
      { questionSet.length > 0 ? ( 
        <div style={{
          background:"#F0EBF8",
          padding: '20px'
        }}>
          <Container maxWidth="md">
            <TestTitleCard moduleName={moduleName} subjectName={subjectName} testType={testType} />
              {questionSet.map((question, index) => (
                <Card key={index} id="navbarFont" style={{ marginBottom: '20px', padding: '10px' }}>
                  <CardContent id={`answer-${index}`}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{`Question ${index + 1}: ${question.question}`}</p>
                    <TextField
                      id={`answer-${index}`}
                      label="Your Answer"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={questionSet[index].user_answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      style={{ marginTop: '10px' }}
                    />
                  </CardContent>
                </Card>
              ))}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Container>
        </div>
      ) : 
      (
        <h3>QUESTION SET NOT UPLOADED YET</h3>
      )
    
      }
    </>
  );
};

export default TestQNA;
