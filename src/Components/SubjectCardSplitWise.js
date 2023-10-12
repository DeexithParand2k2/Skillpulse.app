import * as React from "react";
import { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  Rating
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { subjectIconLinks } from "../Data/ModulesData";
import '../Styles/App.css'

/**
 * @param 
*/

// this is the module where splitwise analysis is displayed
export default function SubjectCardSplitWise({singleSubject,subjectName}) {
  const [expanded, setExpanded] = useState(false);
  const [subtopicsName,changeSubtopicName] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{
    //subjects with marks > -1
    let tempSubtopicsName = [];
    Object.keys(singleSubject).forEach((keys)=>{
        //console.log(singleSubject[keys])
        if(singleSubject[keys] > -1 && keys!="totalMarks"){
            tempSubtopicsName.push(keys);
        }
    })

    console.log(tempSubtopicsName)
    changeSubtopicName(tempSubtopicsName);
  },[singleSubject,subjectName])

  return (
    <div>
    {
      subtopicsName.length > 0 && 
        <Card id="subjectCardSplitwise" style={{ margin:'20px' }} onClick={handleExpandClick}>
          <CardHeader
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>{subjectName.toUpperCase()}</h3>
                <div>
                  <img style={{ width: '30px', height: '30px', marginLeft:'20px' }} src={subjectIconLinks[subjectName]} alt="Icon" />
                </div>
              </div>
            }
            action={
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            }
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* SUBTOPICS HERE */}
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent:'center',
                  margin: '10px'
                }}
              >
                {/* Upper div to handle all the divs below */}


                <div className="Subtopic Rating">
                  {subtopicsName.map((eachTopic, index) => (
                    <div 
                      key={index} 
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "500px"
                      }}
                    >
                      <Typography paragraph>{eachTopic.toUpperCase()}</Typography>
                      <Rating
                        name="custom-rating"
                        value={(singleSubject[eachTopic] / 100) * 5}
                        precision={0.1} // Increase precision for smoother rating display
                        readOnly
                      />
                    </div>                    
                  ))}
                </div>


              </div>
            </CardContent>
          </Collapse>
        </Card>    
  
    }
    </div>

  );
}
