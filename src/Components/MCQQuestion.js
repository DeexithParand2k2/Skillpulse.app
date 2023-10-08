import React, {useEffect, useState} from "react";
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
    useScrollTrigger,
} from '@mui/material';
import '../../src/Styles/App.css'

const MCQQuestion = ({ question, index, handleAnswerChange }) => {
    var {
      question_number,
      question: questionText,
      option1,
      option2,
      option3,
      option4,
      user_answer,
    } = question;

    const [selectedOption, changeSelectedOption] = useState("Select some option")

  
    const handleRadioChange = (event) => {
      handleAnswerChange(index, event.target.value);
      changeSelectedOption(event.target.value.toString())
      console.log('changed',selectedOption)
    };
  
    return (
      <Card key={question_number} style={{ marginBottom: '20px', padding: '10px' }}>
        <CardContent>
          <Typography id="navbarFont" variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {`Question ${question_number}: ${questionText}`}
          </Typography>
          <FormControl id="navbarFont" component="fieldset">
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
          <Typography id="navbarFont" variant="body2" style={{ marginTop: '10px' }}>
              Selected Option: <span style={{ fontWeight:'bold' }}>{selectedOption}</span>
          </Typography>
        </CardContent>
      </Card>
    );
  };

  export default MCQQuestion