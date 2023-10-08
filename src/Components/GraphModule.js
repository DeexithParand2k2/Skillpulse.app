import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent } from '@mui/material';
import EmptyGraphBackground from './EmptyGraphBackground';

function GraphModule({ moduleTypeGraph, testTypeGraph, totalMarks }) {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {

    console.log('find totalMarks', totalMarks)

    if(moduleTypeGraph!=="" && testTypeGraph!==""){

      var filteredKeys = Object.keys(totalMarks[testTypeGraph][moduleTypeGraph]).filter((key)=>{
        return totalMarks[testTypeGraph][moduleTypeGraph][key].totalMarks > -1;
      })

      setSubjects(filteredKeys.map((val)=>val.toUpperCase()))

      var filteredMarks = [];

      filteredKeys.forEach((keys)=>{
        filteredMarks.push(totalMarks[testTypeGraph][moduleTypeGraph][keys].totalMarks)
      }) 

      setMarks(filteredMarks)

    }

    console.log('find subjects',subjects)
    console.log('find marks',marks)

  }, [moduleTypeGraph, testTypeGraph, totalMarks]);

  return (
    <Card>
      <CardContent>
        <div sx={{ minHeight:'300px' }}>
          {subjects.length > 0 && marks.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  id: 'Score-Graph-Representation',
                  data: subjects,
                  scaleType: 'band',
                },
              ]}
              yAxis={[
                {
                  id: 'Score-Graph-Y-Axis',
                  type: 'linear',
                  max: 10, // Set the maximum value to 10
                },
              ]}
              series={[
                {
                  data: marks,
                  color: testTypeGraph === 'entryTest' ? '#3498db' : '#2ecc71', // Set color to red for 'm2'
                },
              ]}
              width={450}
              height={450}
            />
          ) : (
            <EmptyGraphBackground />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GraphModule;
