import React, { useState, useEffect } from 'react';
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import '../../../Styles/App.css'

/**
 * user choice for which test type to display in splitwise component
 * @param {function} changeTestTypeSplitWiseCallback - callback from dashboard used to find the user choice test type to view in splitwise component
 * @returns {JSX.Element}  - returns the dropdown to choose test type in splitwise component
*/

function TestSwitchSplit({changeTestTypeSplitWiseCallback}) {
    const [currentTest, changeTestAnalysis] = useState('entryTest'); // Default state is 'entryTest'

    useEffect(() => {
      console.log(currentTest);
      changeTestTypeSplitWiseCallback(currentTest); // Set onoff to false as in the original code
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

export default TestSwitchSplit