import React, { useEffect, useState } from "react";
import RankingList from "./RankingList";
import { Box, Typography, Modal } from "@mui/material";
import ComparisonTable from "./ComparisonTable";
import { useQuery } from "react-query";
import Spinner from "../ErrorHandling/LoadingScreen";
import ErrorLoader from "../ErrorHandling/ErrorLoader";
import { Divider } from '@mui/material'

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: '40%',
  maxWidth: "80%", // Adjust the maximum width as needed
  maxHeight: "80vh", // Set a maximum height and adjust as needed
  width: "auto", // Adjust the width as needed
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Adjust the shadow as needed
  backgroundColor:'whitesmoke',
  padding: "20px", // Adjust the padding as needed
  overflowY: "auto", // Add scrollbars if content overflows vertically
  zIndex: 1000, // Ensure the modal is on top of other elements
};

const apiEndpoint = "http://127.0.0.1:8000/api/dbaccess/get-scoreboard/";

const Rankings = ({ UserEmail }) => {

  const fetchUsers = async () => {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("myToken"),
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };


  const { data: fetchedData, isFetching, isError } = useQuery(
    "scoreBoardKey",
    fetchUsers,
    {
      // Set staleTime to a high value to avoid frequent refetches
      staleTime: Infinity,
      onSuccess : (data) =>{
        console.log('fetched data successfully',data)
      }
    }
  );

  const [allUsers, setallUsers] = useState([]);
  const [userRank, setUserRank] = useState(0);

  //user1 is the one who is logged in
  const [user1, setUser1] = useState({});
  //user2 is the one who user1 wants to compare himself
  const [user2, setUser2] = useState({});

  //MODAL RELATED.
  const [openModal, setOpenModal] = useState(false);

  // Function to open the modal and set user2
  const handleOpen = (email) => {
    setUser2(allUsers.find((u) => u.email === email));
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  // Finds the user that we need to compare in the allUsers, then opens the modal
  const findUserAndOpenModal = (email) => {
    handleOpen(email);
  };

  useEffect(() => {
    if (fetchedData) {

      const scores = fetchedData?.all_scores;
      const score_board = fetchedData?.score_board;
      let users = [];
      for (let key in score_board) {
        let temp = {
          name: key,
          eis_score: score_board[key],
          email: key,
          m1:{
            entry_test: scores[key]['m1']["entryTest"],
            exit_test: scores[key]['m1']["exitTest"],
          },
          m2: {
            entry_test: scores[key]['m2']["entryTest"],
            exit_test: scores[key]['m2']["exitTest"],
          },
        };

        users.push(temp);
      }

      // Sort users based on EIS SCORE.
      users.sort((a, b) => b.eis_score - a.eis_score);

      // Rank and name of the logged-in user
      let rank = 0;
      let user = "";

      // Find the rank of the logged-in user
      for (let i = 0; i < users.length; i++) {
        if (users[i].email !== UserEmail) continue;

        user = users[i];
        rank = i;
        break;
      }

      setUserRank(rank + 1);
      setUser1(user);
      setallUsers(users);
    }
  }, [fetchedData]);

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorLoader />;
  }

  return (
    <div style={{marginTop:'50px'}}>
      <div>
          <h1 id="headingFont" style={{ textAlign: 'center', margin:'10px' }}>Leaderboard</h1>
          <Divider></Divider>
      </div>
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style}>
            <ComparisonTable user1={user1} user2={user2} />
          </div>
        </Modal>

        <Typography sx={{fontFamily : 'Montserrat, sans-serif', marginTop:'20px', marginBottom:"20px"}} variant="p" component="div" >
          {`Your Rank : ${userRank} / ${allUsers.length}`}
        </Typography>

        <RankingList
          allUsers={allUsers}
          Modalopener={findUserAndOpenModal}
          UserEmail={UserEmail}
        />
      </div>
    </div>
  );
};

export default Rankings;
