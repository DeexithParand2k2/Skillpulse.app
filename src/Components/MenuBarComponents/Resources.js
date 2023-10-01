import React, { useEffect, useState } from 'react';
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import ErrorLoader from '../ErrorLoader';
import Spinner from '../Spinner';
import '../../App.css';

function Resources() {
  const apiEndpoint = 'http://127.0.0.1:8000/api/dbaccess/get-resources/';

  const [test, setTest] = useState('dbms');
  //const queryClient = useQueryClient();

  const fetchData = async (subject) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + sessionStorage.getItem('myToken'),
        },
        body: JSON.stringify({ subject }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['getResources', test],
    () => fetchData(test + 'EntryTest'),
    {
      onSuccess(data) {
        console.log('Fetch for resources successful', data);
      },
      staleTime: Infinity,
    }
  );

  const handleChange = (event) => {
    const selectedTest = event.target.value;
    setTest(selectedTest);

    // Trigger a refetch with the new selectedTest
    refetch();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorLoader />;
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <div>
        <h1 id="headingFont" style={{ textAlign: 'center', margin: '10px' }}>
          Resources
        </h1>
        <Divider></Divider>
      </div>
      <div>
        <FormControl style={{ marginBottom: '20px', minWidth: '150px' }}>
          <InputLabel id="navbarFont">Module</InputLabel>
          <Select
            id="navbarFont"
            label="Module."
            value={test}
            onChange={handleChange}
          >
            <MenuItem id="navbarFont" value="dbms">
              DBMS
            </MenuItem>
            <MenuItem id="navbarFont" value="cn">
              CN
            </MenuItem>
            <MenuItem id="navbarFont" value="os">
              OS
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* Render your fetched data as Material-UI cards */}
      <div>
        {data.resources && Array.isArray(data.resources) && data.resources.length > 0 ? (
          <div>
            {data.resources.map((item,index) => (
              <Card key={index} style={{ marginBottom: '10px' }}>
                <CardContent>
                  {/* <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography> */}
                  <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${item}`} alt="Favicon" />
                  <a href={item}>{item}</a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Typography variant="body2">No data available</Typography>
        )}
      </div>
    </div>
  );
}

export default Resources;
