import React, { useState, useEffect } from 'react'
import ElegantCard from '../ElegantCard'
import {modules} from '../../Data/ModulesData'
import '../../Styles/EvaluationStyles.css'


function CarousalModules({changeChoiceModuleCallback, changeChoiceSubjectCallback, changeChoiceTestCallback}) {

  const [modulesList,updateModulesList] = useState(Object.keys(modules));

  return (
      <div className='Carousal-Modules-Holder'> 
        {modulesList.map((item,index) => (
          <div key={index} onClick={()=>{
            changeChoiceModuleCallback(item)
            changeChoiceSubjectCallback("") //to release the tests part
            changeChoiceTestCallback("")
          }}>
            <ElegantCard cardName={item.toUpperCase()} />
          </div>
        ))}
      </div>
  )
}

export default CarousalModules