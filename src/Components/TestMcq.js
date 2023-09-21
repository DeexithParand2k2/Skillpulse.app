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

var globalFinalAns = 'javaMcqEntryTest';

const getQuestionSet = (subjectName, testType) => {
  var finalans = [];

  if (testType === 'entryTest') {
    switch (subjectName) {
      case 'java':
        finalans = javaMcqEntryTest;
        globalFinalAns = 'javaMcqEntryTest';
        break;
      case 'c/c++':
        finalans = cCppMcqEntryTest;
        globalFinalAns = 'cCppMcqEntryTest';
        break;
      case 'dsa':
        finalans = dsaMcqEntryTest;
        globalFinalAns = 'dsaMcqEntryTest';
        break;
      case 'oops':
        finalans = oopsMcqEntryTest;
        globalFinalAns = 'oopsMcqEntryTest';
        break;
      default:
        finalans = [];
    }
  }

  if (testType === 'exitTest') {
    switch (subjectName) {
      case 'java':
        finalans = javaMcqExitTest;
        globalFinalAns = 'javaMcqExitTest';
        break;
      case 'c/c++':
        finalans = cCppMcqExitTest;
        globalFinalAns = 'cCppMcqExitTest';
        break;
      case 'dsa':
        finalans = dsaMcqExitTest;
        globalFinalAns = 'dsaMcqExitTest';
        break;
      case 'oops':
        finalans = oopsMcqExitTest;
        globalFinalAns = 'oopsMcqExitTest';
        break;
      default:
        finalans = [];
    }
  }

  return finalans;
};



const MCQTestQNA = () => {
  const [answers, setAnswers] = useState([]);
  const [mcqQuestions, setQuestions] = useState([]);

  const { moduleName, subjectName, testType } = useParams();
  const navigate = useNavigate();

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
    const userAnswerObject = Object.fromEntries(
      mcqQuestions.map((question, index) => [question.question_number, Number(answers[index] === question.expected_answer)])
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
