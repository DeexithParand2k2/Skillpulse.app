import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  Typography,
} from '@mui/material';
import {
  cCppMcqEntryTest,
  cCppMcqExitTest,
  javaMcqEntryTest,
  javaMcqExitTest,
  oopsMcqEntryTest,
  oopsMcqExitTest,
  dsaMcqEntryTest,
  dsaMcqExitTest,
} from '../Data/MCQ Tests/ALL_MCQ_TESTS';
import { useNavigate, useParams } from 'react-router';
import MCQQuestion from '../Components/MCQQuestion'
import TestTitleCard from "./TestTitleCard";
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import Spinner from './ErrorHandling/LoadingScreen';
import ErrorLoader from './ErrorHandling/ErrorLoader';

var nameOfTest = '';

const getQuestionSet = (subjectName, testType) => {
  var questionSet = [];

  if (testType === 'entryTest') {
    switch (subjectName) {
      case 'java':
        questionSet = javaMcqEntryTest;
        nameOfTest = 'javaEntryTest';
        break;
      case 'c/c++':
        questionSet = cCppMcqEntryTest;
        nameOfTest = 'c/c++EntryTest';
        break;
      case 'dsa':
        questionSet = dsaMcqEntryTest;
        nameOfTest = 'dsaEntryTest';
        break;
      case 'oops':
        questionSet = oopsMcqEntryTest;
        nameOfTest = 'oopsEntryTest';
        break;
      default:
        questionSet = [];
    }
  }

  if (testType === 'exitTest') {
    switch (subjectName) {
      case 'java':
        questionSet = javaMcqExitTest;
        nameOfTest = 'javaExitTest';
        break;
      case 'c/c++':
        questionSet = cCppMcqExitTest;
        nameOfTest = 'c/c++ExitTest';
        break;
      case 'dsa':
        questionSet = dsaMcqExitTest;
        nameOfTest = 'dsaExitTest';
        break;
      case 'oops':
        questionSet = oopsMcqExitTest;
        nameOfTest = 'oopsExitTest';
        break;
      default:
        questionSet = [];
    }
  }

  return questionSet;
};


const MCQTestQNA = () => {

  const { moduleName, subjectName, testType } = useParams();

  const [answers, setAnswers] = useState([]);
  const [mcqQuestions, setQuestions] = useState([]);
  const [userAnswerObject, setUserAnswerObject] = useState({})
  const [buttonClicked,setButtonClicked] = useState(false);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const apiEndpoint = 'http://127.0.0.1:8000/api/GetMcqRating/';
  // react query

  const createRequestObject = (userAnswers) =>{
    return {
      "UserAnswer" : {
        [nameOfTest] : userAnswers
      }
    }
  }

  // fetch async function
  const fetchData = async () =>{

    try{

      const reqObj = createRequestObject(userAnswerObject);

      console.log('GOOD REQUEST OBJECT', reqObj);
      
      const response = await fetch(apiEndpoint,{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + sessionStorage.getItem('myToken')
        },
        body : JSON.stringify(reqObj)
      })

      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      return response.json();
    }
    catch(error){
      throw error
    }

  }

  //react query : useQuery
  const { data, isFetching, isError } = useQuery(
    ['getMcqTestResults'+moduleName+subjectName+testType],
    () => fetchData(),
    {
      enabled: buttonClicked, //initial fetch
      onSuccess(data) {
        navigate('/dashboard')
      },
      onError(data){
        navigate('/dashboard')
      },
      staleTime : Infinity
    }
  )


  useEffect(()=>{

    //on unMount
    return () => {
      queryClient.invalidateQueries(['getMcqTestResults'+moduleName+subjectName+testType]);
      setAnswers([]);  // Reset answers state
      setUserAnswerObject({});  // Reset userAnswerObject state
    };
  },[])
  

  useEffect(() => {
    console.log('params passed : ', moduleName, subjectName, testType);
    //update the questions set
    setQuestions(getQuestionSet(subjectName, testType));
  }, []);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Create a user object with answers
    const userAnswerObjectSubmission = Object.fromEntries(
      mcqQuestions.map((question, index) => [question.question_number, Number(answers[index] === question.expected_answer)])
    );

    setUserAnswerObject(userAnswerObjectSubmission)

    queryClient.invalidateQueries(['getMcqTestResults', moduleName, subjectName, testType]);

    setButtonClicked(true);
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorLoader />;
  }

  return (
    <div style={{
        background:"#E2EEE0",
        padding: '20px'
    }}>
        <Container maxWidth="md">
          <TestTitleCard moduleName={moduleName} subjectName={subjectName} testType={testType} />
          {mcqQuestions.map((question, index) => (
              <MCQQuestion
              key={question.question_number}
              question={question}
              index={index}
              handleAnswerChange={handleAnswerChange}
              />
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
          </Button>
        </Container>
    </div>
  );
};

export default MCQTestQNA;
