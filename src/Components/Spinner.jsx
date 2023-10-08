import React from "react";

const styles = {
  modalBackground: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(252,254,252)'
  },
  modalContainer: {
    width: '300px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Spinner = () => {
  return (
    <div style={styles.modalBackground}>
      <div style={styles.modalContainer}>
        <img src="/images/loading.gif" style={{ width: "500px" }} alt="Loading" />
      </div>
    </div>
  );
};

export default Spinner;
