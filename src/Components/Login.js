import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './login.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function Login() {

  const [token,setToken]=useState("");
  const [showLog,setShowLog]=useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg,setMsg]=useState("");
  const [sev,setSev]=useState("");

  const navigate = useNavigate();

  const loginHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({
      username: formData.get('email'),
      password: formData.get('password'),
    });


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": formData.get('email'),
      "password": formData.get('password')
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("http://localhost:8000/api/token-auth/", requestOptions)   //enter login post end point.
      .then(response=>response.json())
      .then(result => {

        console.log(result)

        if(result.token){
          setToken(result.token);
          sessionStorage.setItem("myToken",result.token);
          sessionStorage.setItem("myUseremail",requestOptions.body)
          navigate('/dashboard');
          console.log("Token:"+result.token);  
        }
        else{
          console.log('wrong credentials');
          setMsg('Wrong credentials');
          setSev('error');
          setOpenSnackbar(true);
        } 
        
      })
      .catch(error => console.log('error', error));

    //navigate to dashboard on correct response

    //else navigate to dashboard itself
  };

  const signupHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": formData.get('email'),
      "username": formData.get('username'),
      "password": formData.get('password')
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("http://localhost:8000/api/register-user/", requestOptions)   //enter signup post end point.
      .then(response=>response.json())
      .then(result => {
        console.log(result)                                            //get response as message
        if (result.message === 'error' || result.message === "") {     //if error, message='error'
          console.log('User already exists!! OR wrong credentials');
          setMsg('User already exists OR wrong credentials');
          setSev('error');
          setOpenSnackbar(true);
        } else {                                                       //if ok, message='success'
          console.log('Sign Up successfull');
          setMsg('Sign Up successfull!!!');
          setSev('success');
          setOpenSnackbar(true);
          toggleLogin();
        }

        console.log("Message:"+result.message);  
      })
      .catch(error => console.log('error', error));
  };

  const toggleSignup=()=>{
    document.getElementById("login-toggle").style.backgroundColor="transparent";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="skyblue";
     document.getElementById("signup-toggle").style.color="#fff";
     setShowLog(false);
  }
  const toggleLogin=()=>{
    document.getElementById("login-toggle").style.backgroundColor="skyblue";
    document.getElementById("login-toggle").style.color="#fff";
    document.getElementById("signup-toggle").style.backgroundColor="transparent";
    document.getElementById("signup-toggle").style.color="#222";
    setShowLog(true);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={sev} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',
            backgroundImage: 'url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
          }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        style={{
            background: 'transparent',
            backdropFilter: 'blur(8px) saturate(100%)',
            WebkitBackdropFilter: 'blur(2px) saturate(100%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(209, 213, 219, 0.3)',
          }}
        >
          <Box
            sx={{
              my: 5,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="form-toggle">
              <button id="login-toggle" onClick={toggleLogin}>Log In</button>
              <button id="signup-toggle" onClick={toggleSignup}>Sign Up</button>
            </div>
            <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
              <LockOutlinedIcon />
            </Avatar>
            {showLog?<LoginComp/>:<SignUpComp/>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );

  function LoginComp() {
    return( 
     <> 
    <Typography component="h1" variant="h5">
      Log in
    </Typography>
    <Box component="form" onSubmit={loginHandleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password" />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: 'grey' }}
      >
        Log In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item xs textAlign={'end'}>
          <Link href="/" variant="body2">
            Home Page
          </Link>
        </Grid>
      </Grid>
    </Box>
    </>);
  }
  function SignUpComp() {
    return( 
        <> 
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
         <Box component="form" onSubmit={signupHandleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="User Name"
        name="username"
        autoComplete="username"
         />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: 'grey' }}
      >
        Sign Up
      </Button>
      <Grid container>
      <Grid item xs>
          <Link href="#" variant="body2" onClick={toggleLogin}>
            Login
          </Link>
        </Grid>
        <Grid item xs textAlign={'end'}>
          <Link href="/" variant="body2">
            Home Page
          </Link>
        </Grid>
      </Grid>
    </Box>
       </>);
  }
}