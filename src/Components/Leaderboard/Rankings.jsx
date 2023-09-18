import React, { useEffect, useState } from "react";
import RankingList from "./RankingList";
import { Box, Typography, Modal } from "@mui/material";
import ComparisonTable from "./ComparisonTable";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import ErrorLoader from "../ErrorLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 500,
};

const apiEndpoint = "http://127.0.0.1:8000/api/dbaccess/get-scoreboard/";

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

const Rankings = ({ UserEmail }) => {
  const { data: fetchedData, isFetching, isError } = useQuery(
    "scoreBoardKey",
    fetchUsers,
    {
      // Set staleTime to a high value to avoid frequent refetches
      staleTime: Infinity,
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
          m2: {
            entry_test: scores[key]["entryTest"],
            exit_test: scores[key]["exitTest"],
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

      <div>
        <p>{`Your Rank : ${userRank} / ${allUsers.length}`}</p>
      </div>

      <RankingList
        allUsers={allUsers}
        Modalopener={findUserAndOpenModal}
        UserEmail={UserEmail}
      />
    </div>
  );
};

export default Rankings;
