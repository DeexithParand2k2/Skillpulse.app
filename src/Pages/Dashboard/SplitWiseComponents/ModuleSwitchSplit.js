import React,{useState, useEffect} from 'react'
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import '../../../Styles/App.css'

/**
 * user choice for which module to display in splitwise component
 * @param {function} changeTestTypeGraphCallback - callback from dashboard used to find the user choice module to view in graph
 * @returns {JSX.Element} - returns the dropdown to choose module in graph
*/

function ModuleSwitchSplit({ changeModuleTypeSplitWiseCallback }) {

    const [moduleTypeSplitWise, changeModuleTypeSplitWise] = useState('m1');

    useEffect(() => {
        changeModuleTypeSplitWiseCallback(moduleTypeSplitWise); // Set onoff to false as in the original code
    }, [moduleTypeSplitWise]);

    const handleChange = (event) => {
        const selectedMoudle = event.target.value;
        changeModuleTypeSplitWise(selectedMoudle);
    };

  return (
    <div>
        <FormControl style={{ marginBottom: "20px", minWidth:"150px" }}>
            <InputLabel id="navbarFont">Module</InputLabel>
                <Select
                id="navbarFont"
                label="Module."
                value={moduleTypeSplitWise}
                onChange={handleChange}
                >
                    <MenuItem id="navbarFont" value="m1">Module 1</MenuItem>
                    <MenuItem id="navbarFont" value="m2">Module 2</MenuItem>
                </Select>
        </FormControl>
    </div>
  )
}

export default ModuleSwitchSplit