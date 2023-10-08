import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const handleClick = () =>{
    let token = sessionStorage.getItem('myToken');
    if (token === null || token === "") {
      setOpenSnackbar(true)
    } 
    else{
      navigate('/dashboard')
    } 
  }

  useEffect(()=>{
    let token = sessionStorage.getItem('myToken');
    if (token === null || token === "") {
      setOpenSnackbar(true)
    }    
  },[])
  
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert sx={{width:'350px'}} severity="warning">Welcome back! Please log in to continue.</Alert>
      </Snackbar>
      

      {/* Navbar */}
      <div>
      <header className="header sticky top-0 bg-white flex items-center justify-between px-8 py-02">
        <h1 className="w-3/12">
          <a className="font-Pacifico" href="">SkillPulse</a>
        </h1>
        <nav className="nav font-semibold text-lg">
          <ul className="flex items-center ">
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active ">
              <a href="">Home</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a onClick={handleClick}>Dashboard</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="">FAQ</a>
            </li>
          </ul>
        </nav>

        <div className="w-3/12 flex justify-end">
          <a href="/login" className="btn btn-green mr-4 bg-slate-600 text-white px-4 py-2 rounded-[25px] hover:drop-shadow-xl">
            Login
          </a>
        </div>
      </header>
    </div>

      {/* Home page content */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-12">
        <div className="">
          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
              <div className="mx-auto max-w-xl">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                  Mock test.
                  <strong className="font-extrabold text-yellow-700 sm:block">
                    Improve your skills.
                  </strong>
                </h1>
                <p className="mt-4 sm:text-xl/relaxed">
                  Crack your next placement with series of practice and mock tests.
                </p>
                <div className="mt-8 gap-4">
                  <a
                    className="block w-1/3 text-center rounded-[30px] bg-slate-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500"
                    href=""
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="flex justify-center items-center ">
          <img 
            className="rounded-md w-[50rem]"
            src="https://png.pngtree.com/png-vector/20220615/ourmid/pngtree-online-testing-background-vector-illustration-with-checklist-png-image_5084756.png"
            alt="quiz test"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
