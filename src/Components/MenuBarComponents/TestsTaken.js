import React, { useState, useEffect } from 'react'
import { TestModulesHistory, TestTotalMarks } from '../../Data/TestHistory';
import Loading from '../Spinner'
import ErrorLoader from '../ErrorLoader'
import '../../Styles/App.css'
import {
  Divider,
} from '@mui/material';
import { useQuery } from 'react-query';
import Spinner from '../Spinner';
import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";

const apiEndpoint = "http://localhost:8000/api/dbaccess/get-total-marks/";

function TestsTaken() {

  const { data, isLoading, isError } = useQuery('testsTakenRequestKey', fetchData);

  const [testModulesHistory, changeTestModulesHistory] = useState(TestModulesHistory);
  const [cardContent, setCardContent] = useState([]);


  const updateCardContent = (testModulesHistory) =>{

    let moduleOneArray = [], moduleTwoArray = [];

    //first for m1 - entry and exit test
    Object.keys(testModulesHistory.m1).forEach((subject)=>{
  
      let tempEntryObject = {}, tempExitObject = {};  

      //entry test
      if(testModulesHistory.m1[subject]['entryTest']===true){

        tempEntryObject['module'] = 'm1';
        tempEntryObject['subject'] = subject;
        tempEntryObject['testtype'] = 'entryTest';
        tempEntryObject['time'] = testModulesHistory.m1[subject].entryTestCompletion;

  
        moduleOneArray.push(tempEntryObject)
      }
  
      //exit test
      if(testModulesHistory.m1[subject]['exitTest']){
        tempExitObject['module'] = 'm1';
        tempExitObject['subject'] = subject;
        tempExitObject['testtype'] = 'exitTest';
        tempExitObject['time'] = testModulesHistory.m1[subject].exitTestCompletion;

        moduleOneArray.push(tempExitObject)
      }

    })
  
    Object.keys(testModulesHistory.m2).forEach((subject)=>{
  
      let tempEntryObject = {}, tempExitObject = {};
  
      //entry test
      if(testModulesHistory.m2[subject]['entryTest']){
        tempEntryObject['module'] = 'm2';
        tempEntryObject['subject'] = subject;
        tempEntryObject['testtype'] = 'entryTest';
        tempEntryObject['time'] = testModulesHistory.m2[subject].entryTestCompletion;

        console.log('2',testModulesHistory.m2[subject].entryTestCompletion)
  
        moduleTwoArray.push(tempEntryObject)
      }
 
      //exit test
      if(testModulesHistory.m2[subject]['exitTest']===true){
        tempExitObject['module'] = 'm2';
        tempExitObject['subject'] = subject;
        tempExitObject['testtype'] = 'exitTest';
        tempExitObject['time'] = testModulesHistory.m2[subject].exitTestCompletion;

        console.log('2',testModulesHistory.m2[subject].exitTestCompletion)
  
        moduleTwoArray.push(tempExitObject)
      }
  
    })
  
    return moduleOneArray.concat(moduleTwoArray)
  }

  async function fetchData(){

    const response = await fetch(apiEndpoint,{
      method : "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('myToken'),
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();

  }

  const sortArrayOnTime = (array) => {

    array.sort((a,b)=>{

      const timeA = new Date(a.time)
      const timeB = new Date(b.time)

      return timeB-timeA

    })

    return array;

  }

  useEffect(()=>{

    if(data){
      changeTestModulesHistory(data)

      let retCardContent = updateCardContent(data)
      let sortedCardContent = sortArrayOnTime(retCardContent) 
      setCardContent(sortedCardContent)
      console.log(cardContent)
    }

  },[data,testModulesHistory])

  if(isLoading){
    return <Spinner />
  }

  if(isError){
    return <ErrorLoader />
  }

  return (
    <div style={{marginTop:'50px'}}>
      <div>
          <h1 id="headingFont" style={{ textAlign: 'center', margin:'10px' }}>Test History</h1>
          <Divider></Divider>
      </div>


      <div>

        <Card sx={{ display: "flex", margin:'10px' }} >

          <Box width="100%"> {/* Set the width to 100% */}
            <CardContent sx={{ display: "flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center' , width: '100%' }}> {/* Set the width to 100% */}

              <Typography
                variant="subtitle1"
                component="div"
                sx={{width:'100px', textAlign:'center'}}
              >
                MODULE
              </Typography>

              <Typography
                variant="subtitle1"
                component="div"
                sx={{width:'100px', textAlign:'center'}}
              >
                SUBJECT
              </Typography>

              <Typography
                variant="subtitle1"
                component="div"
                sx={{width:'100px', textAlign:'center'}}
              >
                TEST TYPE
              </Typography>

              <Typography
                variant="subtitle1"
                component="div"
                sx={{width:'100px', textAlign:'center'}}
              >
                DATE<br/>TIME
              </Typography>

            </CardContent>
          </Box>

        </Card>
          {
            cardContent.map((content, idx) => (
              <Card sx={{ 
                display: "flex", 
                margin:'10px',
                color: idx===0 ? 'white' : 'black',
                backgroundColor: idx===0 ? 'black' : 'white'
              }} key={idx} >
                <Box width="100%">
                  <CardContent sx={{ display: "flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center' , width: '100%' }}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{width:'100px', textAlign:'center'}}
                    >
                      {content.module.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{width:'100px', textAlign:'center'}}
                    >
                      {content.subject.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{width:'100px', textAlign:'center'}}
                    >
                      {content.testtype.toUpperCase()==="ENTRYTEST" ? "ENTRY TEST" : "EXIT TEST"}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{width:'100px', textAlign:'center'}}
                    >
                      {content.time.toUpperCase()}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))
          }


      </div>
    </div>
  )
}

export default TestsTaken