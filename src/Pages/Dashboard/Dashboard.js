import React,{useEffect, useState} from 'react'
import GraphModule from '../../Components/GraphModule';
import {
  Button,
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import Spinner from '../../Components/ErrorHandling/LoadingScreen';
import ErrorLoader from '../../Components/ErrorHandling/ErrorLoader';

import TestModal from '../../Components/TestModal'
import { TestTotalMarks } from '../../Data/TestHistory';
import ModuleAnalysis from '../../Components/ModuleAnalysis';

import { ModuleSwitch, TestSwitch } from './Graphmodules';
import { ModuleSwitchSplit, TestSwitchSplit } from './SplitWiseComponents';


import '../../Styles/App.css'
import '../../Styles/DashboardStyles.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  },
});

async function updateTestHistory() {

  const response = await fetch('http://localhost:8000/api/dbaccess/get-test-mark/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('myToken'),
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();

}


function Dashboard() {

  const { data, isLoading, isError } = useQuery('dashboardKey', updateTestHistory)

  const navigate = useNavigate();

  const [open, setOpen] = useState(false); //to open and close the modal
  const [takeTest,changeTakeTest] = useState([]);
  

  // choice for viewing marks on graphs
  const [testTypeGraph,changeTestTypeGraph] = useState("entryTest");
  const [moduleTypeGraph,changeModuleTypeGraph] = useState("m1");

  // choice for viewing marks on 
  const [testTypeSplitWise,changeTestTypeSplitWise] = useState("entryTest");
  const [moduleTypeSplitWise,changeModuleTypeSplitWise] = useState("m1");

  const [totalMarks, changeTotalMarks] = useState(TestTotalMarks);
  
  useEffect(() => {

    localStorage.setItem('TestTotalMarksCookie', JSON.stringify(totalMarks));

    //check for token or redirect to the home page
    let token = sessionStorage.getItem('myToken');
    if (token === null || token === "") {
      navigate('/home');
    }    

  }, []);

  useEffect(()=>{
    if (data) {
      console.log('got fetched data', data);
      changeTotalMarks(data);

      //make a copy and update the TestTotal marks from data here
      localStorage.setItem('TestTotalMarksCookie', JSON.stringify(data));
    }
  },[data])

  if(isLoading){
    return <Spinner />
  }

  if(isError){
    return <ErrorLoader />
  }

  //### call backs for graphs
  const changeTestTypeGraphCallback = (newchoice) =>{
    changeTestTypeGraph(newchoice);
  }

  const changeModuleTypeGraphCallback = (newchoice) =>{
    changeModuleTypeGraph(newchoice);
  }
  //### call backs graph done here


  //### moduleAnalysis splitwise call backs 
  const changeTestTypeSplitWiseCallback = (newchoice) =>{
    changeTestTypeSplitWise(newchoice);
  }

  const changeModuleTypeSplitWiseCallback = (newchoice) =>{
    changeModuleTypeSplitWise(newchoice);
  }
  //### moduleAnalysis splitwise call backs 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //takeTest, redirect to test with params
    console.log(takeTest.join('/'))

    const moduleName = takeTest[0];
    const subjectName = takeTest[1];
    const testType = takeTest[2]; // Replace with your dynamic value
    console.log('Navigation done ',`/test/${moduleName}/${subjectName}/${testType}`)

    if (moduleName !== "" && subjectName !== "" && testType !== "" && moduleName === "m1") {
      const encodedSubjectName = encodeURIComponent(subjectName);
      const encodedModuleName = encodeURIComponent(moduleName);
      const encodedTestType = encodeURIComponent(testType);
    
      if (testType === 'exitTest' && totalMarks.entryTest[moduleName][subjectName].totalMarks > -1) {
        navigate(`/test-mcq/${encodedModuleName}/${encodedSubjectName}/${encodedTestType}`);
      } else if (testType === 'entryTest') {
        navigate(`/test-mcq/${encodedModuleName}/${encodedSubjectName}/${encodedTestType}`);
      } else {
        // handle modal closer here
        navigate(`/dashboard`);
      }
    }
    
    if (moduleName !== "" && subjectName !== "" && testType !== "" && moduleName === "m2") {
      const encodedSubjectName = encodeURIComponent(subjectName);
      const encodedModuleName = encodeURIComponent(moduleName);
      const encodedTestType = encodeURIComponent(testType);
    
      if (testType === 'exitTest' && totalMarks.entryTest[moduleName][subjectName].totalMarks > -1) {
        navigate(`/test/${encodedModuleName}/${encodedSubjectName}/${encodedTestType}`);
      } else if (testType === 'entryTest') {
        navigate(`/test/${encodedModuleName}/${encodedSubjectName}/${encodedTestType}`);
      } else {
        navigate(`/dashboard`);
      }
    }

    setOpen(false);
  };

  const getCombinedChoices = (module,subject,test) =>{
    let arr = [];
    arr.push(module);
    arr.push(subject);
    arr.push(test);
    changeTakeTest(arr);
  }

  return (
    <div style={{marginTop:'50px'}}>
        <ThemeProvider theme={theme}>
          <div className='Dashboard-Container'>

            <div>
              <h1 id="headingFont" style={{ textAlign: 'center', margin:'10px' }}>Dashboard</h1>
            </div>

            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <Divider variant='middle'></Divider>
            </div>

            {/* 1. graph representation, writing the formcontrol outside */}
            <div style={{display:'flex',flexDirection:'column'}} className='Score-Graph-Representation'>

              <div style={{display:'flex', gap:'20px', margin:'10px'}}>
                <TestSwitch changeTestTypeGraphCallback={changeTestTypeGraphCallback} />
                <ModuleSwitch changeModuleTypeGraphCallback={changeModuleTypeGraphCallback}/>
              </div>
              
              <GraphModule moduleTypeGraph={moduleTypeGraph} testTypeGraph={testTypeGraph} totalMarks={totalMarks} />
            </div>

            <div style={{ position: 'relative', marginBottom: '50px', marginTop: '50px' }}>
              <Divider variant='middle'></Divider>
            </div>

            {/* Predefined score rep json from DATA, also the comments */}
            
            {/* 2. SplitWise Analysis */}
            <div style={{display:'flex',flexDirection:'column'}} className='Score-Graph-Representation'>
              <div style={{display:'flex', gap:'20px', margin:'10px'}}>
                <TestSwitchSplit changeTestTypeSplitWiseCallback={changeTestTypeSplitWiseCallback}/>
                <ModuleSwitchSplit changeModuleTypeSplitWiseCallback={changeModuleTypeSplitWiseCallback}/>
              </div>

              <ModuleAnalysis testTypeSplitWise={testTypeSplitWise} moduleTypeSplitWise={moduleTypeSplitWise} totalMarks={totalMarks} />
            </div>
            
            
            <div style={{ position: 'relative', marginBottom: '10px', marginTop: '10px' }}>
              <Divider variant='middle'></Divider>
            </div>
            
            {/* This should open a fullscreen modal */}
            <div className="Evaluation-Modal">
              <Button variant="outlined" sx={{margin:'50px'}}  onClick={handleClickOpen}>
                Take Test
              </Button>

              {/* This opens only on click, evaluation choices will */}
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                className='Dialog-Container'
                id="navbarFont"
              >
                
                <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1, fontSize:'15px' }} variant="p">
                      CHOOSE TEST MODULES
                    </Typography>
                    {/* <Button id="navbarFont" color="inherit" variant="p" onClick={handleClose}>
                      Take Test
                    </Button> */}
                    <Button
                      color="inherit"
                      variant="outlined" // Use outlined variant for a subdued appearance
                      sx={{
                        fontSize:'14px',
                        '&:hover': {
                          color: 'lime', // Use a slightly transparent white for text color
                          borderColor: 'lime', // Use a slightly transparent white for border color
                        },
                      }}
                      onClick={handleClose}
                    >
                      Take Test
                    </Button>
                  </Toolbar>
                </AppBar>

                {/* You can add your custom content here */}
                <TestModal getCombinedChoices={getCombinedChoices} />

              </Dialog>
            </div>
          </div>
        </ThemeProvider>
    </div>
  )
  
}

export default Dashboard