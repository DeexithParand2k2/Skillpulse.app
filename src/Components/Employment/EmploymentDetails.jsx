import { useEffect, useState } from "react";

import EmployeeList from "./EmployeeList";

import TitleHead from "./TitleHead";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";
import ErrorLoader from "../ErrorLoader";
import { useQuery } from 'react-query';
import Spinner from "../Spinner";


const EmploymentDetails = () => {

  async function fetchDataFunction() {

    const response = await fetch('http://127.0.0.1:8000/api/dbaccess/get-seniordata/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('myToken'),
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  const { data, isLoading, isError } = useQuery('employmentdbKey', fetchDataFunction);

  const [arrangement, setArrangement] = useState("");
  const [result,changeResult]  = useState([]);

  useEffect(()=>{
    if (data) {
      console.log('got fetched data emp db ', data);
      changeResult(data.senior_profiles);
    }
  },[data])

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorLoader />;
  }

  const higherToLower = (a, b) => {
    return b.ctc - a.ctc;
  };

  const lowerToHigher = (a, b) => {
    return a.ctc - b.ctc;
  };

  const sortHandler = (e) => {
    const type = e.target.value;
    setArrangement(type);
  
    let temp = [...result]; // Create a copy of the result array
  
    if (type === "asc") {
      temp.sort(lowerToHigher);
    } else {
      temp.sort(higherToLower);
    }
  
    changeResult(temp);
  };
  

  return (
    <div>
      {result.length !== 0 &&
        <>
        <div style={{ margin: "10px" }}>
          <h1 id="headingFont" style={{ textAlign: 'center', margin:'10px' }}>Employment Database</h1>
          <Divider></Divider>
        </div>
        <div style={{ margin: "10px", marginTop:'30px', marginBottom:'25px' }}>
            <FormControl style={{ minWidth: "200px" }}>
              <InputLabel id="demo-simple-select-label">SORT - CTC</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={arrangement}
                label="SORT - CTC"
                onChange={sortHandler}
              >
                <MenuItem value="asc">Lower to Higher</MenuItem>
                <MenuItem value="desc">Higher to Lower</MenuItem>
              </Select>
            </FormControl>
        </div>

        <div>
          <Card sx={{ display: "flex", margin:'10px' }} >
            <Box width="100%"> {/* Set the width to 100% */}
              <CardContent sx={{ display: "flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center' , width: '100%' }}> {/* Set the width to 100% */}
                
                <Typography sx={{width:'100px', textAlign:'center'}} component="div" variant="subtitle1">
                  Profile
                </Typography>

                <Typography sx={{width:'100px', textAlign:'center'}} component="div" variant="subtitle1">
                  Name
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{width:'100px', textAlign:'center'}}
                >
                  Company
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{width:'100px', textAlign:'center'}}
                >
                  CTC (LPA)
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{width:'100px', textAlign:'center'}}
                >
                  EIS Score
                </Typography>
              </CardContent>
            </Box>
          </Card>
          
          <EmployeeList seniors={result} />
        </div>
        </>
      }

    </div>
  );
};

export default EmploymentDetails;
