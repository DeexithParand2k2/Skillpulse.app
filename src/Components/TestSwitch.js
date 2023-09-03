import React, { useState, useEffect } from 'react';
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import '../App.css'

function TestSwitch({ changeTestTypeGraphCallback }) {
  const [currentTest, changeTestAnalysis] = useState(''); // Default state is 'entryTest'

  useEffect(() => {
    console.log(currentTest);
    changeTestTypeGraphCallback(currentTest); // Set onoff to false as in the original code
  }, [currentTest]);

  const handleChange = (event) => {
    const selectedTest = event.target.value;
    changeTestAnalysis(selectedTest);
  };

  return (
    <div>
        <FormControl sx={{marginBottom: "20px", width:'150px'}}>
            <InputLabel id="navbarFont">Test Type</InputLabel>
            <Select 
                id="navbarFont"
                label=".Test.Type"
                value={currentTest} 
                onChange={handleChange}
            >
                <MenuItem id="navbarFont" value="entryTest">Entry Test</MenuItem>
                <MenuItem id="navbarFont" value="exitTest">Exit Test</MenuItem>
            </Select>
        </FormControl>
    </div>
  );
}

export default TestSwitch;
