import React from "react";
import RankingItem from "./RankingItem";


const RankingList = ({ allUsers, Modalopener, UserEmail }) => {
  
  return (
    <div>
      {allUsers.map((user, index) => {
        const isUser = user.email === UserEmail;
        return (
          <div key={index}>
            <RankingItem
              ranking={index + 1}
              name={user.name}
              eis_score={user.eis_score}
              Modalopener={Modalopener}
              email={user.email}
              isUser={isUser}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RankingList;
