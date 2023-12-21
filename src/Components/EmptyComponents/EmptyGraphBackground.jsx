import React from "react";

const EmptyGraphBackground = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "300px",
    width: "600px",
    position: "relative",
    overflow: "hidden",
  };

  const imageStyle = {
    width:'100%'
  };

  const textStyle = {
    position: "absolute",
    top: "50%",
    left: "50%", // Center the text horizontally
    transform: "translate(-50%, -50%)", // Center the text both horizontally and vertically
    textAlign: "center", // Center-align the text
    width: "100%", // Adjust the width of the text container
    fontSize: "40px",
    fontFamily: "monospace",
    color: "#000", // Add a semi-transparent background for better readability
    padding: "10px", // Add some padding for spacing
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://t3.ftcdn.net/jpg/01/37/61/16/360_F_137611645_SOy1fYxCtghdD2OlOiBwri7IXozGCemV.jpg"
        alt="Graph"
        style={imageStyle}
      />
      <div style={textStyle}>
        <p>No Data Yet</p>
        <p>Take your Test So that we can assess you</p>
      </div>
    </div>
  );
};

export default EmptyGraphBackground;


