import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
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
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

var globalFinalAns = "javaMcqEntryTest"

const getQuestionSet = (subjectName,testType) =>{

  var finalans = [];

  if(testType === 'entryTest'){

    switch(subjectName) {
      case 'java':
        finalans = javaMcqEntryTest; 
        globalFinalAns = "javaMcqEntryTest";
        break;
      case 'c/c++':
        finalans = cCppMcqEntryTest; 
        globalFinalAns = "cCppMcqEntryTest";
        break;
      case 'dsa':
        finalans = dsaMcqEntryTest; 
        globalFinalAns = "dsaMcqEntryTest";
        break;
      case 'oops':
        finalans = oopsMcqEntryTest; 
        globalFinalAns = "oopsMcqEntryTest";
        break;
      default:
        finalans = [];
    }
  }
  
  if(testType === 'exitTest'){

    switch(subjectName) {
        case 'java':
            finalans = javaMcqExitTest; 
            globalFinalAns = "javaMcqExitTest";
            break;
          case 'c/c++':
            finalans = cCppMcqExitTest; 
            globalFinalAns = "cCppMcqExitTest";
            break;
          case 'dsa':
            finalans = dsaMcqExitTest; 
            globalFinalAns = "dsaMcqExitTest";
            break;
          case 'oops':
            finalans = oopsMcqExitTest; 
            globalFinalAns = "oopsMcqExitTest";
            break;
          default:
            finalans = [];   
    }
  }

  return finalans;
}

const MCQQuestion = ({ question, index, handleAnswerChange }) => {
  const {
    question_number,
    question: questionText,
    option1,
    option2,
    option3,
    option4,
    user_answer,
  } = question;

  const handleRadioChange = (event) => {
    handleAnswerChange(index, event.target.value);
  };

  return (
    <Card key={question_number} style={{ marginBottom: '20px', padding: '10px' }}>
      <CardContent>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{`Question ${question_number}: ${questionText}`}</p>
        <FormControl component="fieldset">
          <RadioGroup
            name={`question-${index}`}
            value={user_answer}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={`${option1} (A)`}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={`${option2} (B)`}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={`${option3} (C)`}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={`${option4} (D)`}
            />
          </RadioGroup>
        </FormControl>
        {user_answer && (
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Selected Option: {user_answer}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const MCQTestQNA = () => {
  const [answers, setAnswers] = useState([]);
  const [mcqQuestions, setQuestions] = useState([])

  const { moduleName, subjectName, testType } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('params passed : ',moduleName,subjectName,testType);
    //update the questions set
    setQuestions(getQuestionSet(subjectName,testType));
  },[])

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Create a user object with answers
    const userAnswerObject = Object.fromEntries(
      mcqQuestions.map((question, index) => [question.question_number, Number(answers[index]===question.expected_answer)])
    );

    // Send the user answer object to the server or perform further actions
    console.log('User answers:', userAnswerObject);
  };

  return (
    <Container maxWidth="md">
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
  );
};

export default MCQTestQNA;
