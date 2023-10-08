import React, {useState,useEffect} from 'react'
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import '../../App.css'

function ModuleSwitch({ changeModuleTypeGraphCallback }) {

    const [moduleGraph, changeModuleGraph] = useState('m1');

    useEffect(() => {
        changeModuleTypeGraphCallback(moduleGraph); // Set onoff to false as in the original code
    }, [moduleGraph]);

    const handleChange = (event) => {
        const selectedMoudle = event.target.value;
        changeModuleGraph(selectedMoudle);
    };

  return (
    <div>
        <FormControl style={{ marginBottom: "20px", minWidth:"150px" }}>
            <InputLabel id="navbarFont">Module</InputLabel>
                <Select
                id="navbarFont"
                label="Module."
                value={moduleGraph}
                onChange={handleChange}
                >
                    <MenuItem id="navbarFont" value="m1">Module 1</MenuItem>
                    <MenuItem id="navbarFont" value="m2">Module 2</MenuItem>
                </Select>
        </FormControl>
    </div>
  )
}

export default ModuleSwitch