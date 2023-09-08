import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Card,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../../App.css';

const handleLogout = () =>{

    //remove the token

    //navigate to home page

}

function ProfileCard({ showProfile }) {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState('User');

  const logoutButtonStyles = {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    cursor: 'pointer',
    filter: 'grayscale(100%)', // Apply grayscale to make it black and white
    transition: 'transform 0.2s ease', // Define the transition effect
    transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Scale up slightly on hover
  };

  return (
    <div id="navbarFont" style={{ position: 'absolute', top: '7%', right: '2%', zIndex: '1101' }}>
      {showProfile ? (
        <Card sx={{ padding: '7px' }}>
          <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
            <PersonIcon />
            <p>{username}</p>
          </div>
          <div
            style={logoutButtonStyles}
            onClick={() => handleLogout()}
            onMouseEnter={() => setIsHovered(true)} // Handle hover state
            onMouseLeave={() => setIsHovered(false)}
          >
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileCard;
