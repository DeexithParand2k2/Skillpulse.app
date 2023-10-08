import React, { useEffect, useState } from 'react'
import {TestModulesHistory} from '../../Data/TestHistory'
import ElegantCard from '../ElegantCard'
import '../../Styles/EvaluationStyles.css'
import { Divider } from '@mui/material'

function CarousalTests({userChoiceSubject,changeChoiceTestCallback,userChoiceModule}) {


  const [testAttendance,updateTestAttendance] = useState({})

  //check the testHistory for selected Subject : namesake
  useEffect(()=>{

    // if(TestModulesHistory[userChoiceModule]!==""){
    //   var storekey = "nf"
    //   //find the key, by looping through
    //   for(const key in TestModulesHistory[userChoiceModule]){
    //     if(TestModulesHistory[userChoiceModule][key].subjectName === userChoiceSubject){
    //       storekey = key;
    //       break;
    //     }
    //   }      

    //   if(storekey!=="nf"){
    //     var obj = {
    //       entryTest : TestModulesHistory[userChoiceModule][storekey].entryTest,
    //       exitTest : TestModulesHistory[userChoiceModule][storekey].exitTest,
    //     };
    //     updateTestAttendance(obj);
    //   }

    // }

    
    
    

  },[userChoiceSubject,userChoiceModule])

  return (
    <div>
      <Divider  style={{position:'relative',width:'100%'}} />
      <div className='Carousal-Tests-Holder'>
        {userChoiceSubject!=="" ? (
          <div className='Carousal-Tests-Holder'>
            {!testAttendance.entryTest ? 
              (
                <div onClick={()=>{changeChoiceTestCallback("entryTest")}}>
                  <ElegantCard  cardName={`ENTRY TEST`} />
                </div>
              ):
              (
                <div>
                  <ElegantCard cardName={`FINISHED`} />
                </div>
              )
            }
            {!testAttendance.exitTest ? 
              (
                <div onClick={()=>{changeChoiceTestCallback("exitTest")}}>
                  <ElegantCard  cardName={`EXIT TEST`} />
                </div>
              ):
              (
                <div>
                  <ElegantCard  cardName={`FINISHED`} />
                </div>
              )
            }
          </div>
        ) : <h3>SELECT SUBJECT TO VIEW TESTS</h3> }
      </div>

      
    </div>

  )
}

export default CarousalTests