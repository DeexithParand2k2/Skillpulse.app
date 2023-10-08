import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router";
import TestsTaken from './MenuBarComponents/TestsTaken'
import EmploymentDB from "./MenuBarComponents/EmploymentDB";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import Resources from "./MenuBarComponents/Resources";
import ProfileCard from "./MenuBarComponents/ProfileCard";
import React, {useEffect, useState} from "react";
import Leaderboard from "./MenuBarComponents/Leaderboard";
import { Avatar } from "@mui/material";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  backgroundColor: "white",
  color: "black",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));


export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData,setMenuData] = useState('dashboard')
  const [eisScore, setEisScore] = useState(0.0);
  const [userEmail, setUserEmail] = useState('yogi@gmail.com')

  const [showProfile,setShowProfile] = useState(false)

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboardClick = () => {
    // Use the navigate function to redirect to the Dashboard page
    navigate('/dashboard/');
    setMenuData('dashboard')
  };

  const handleTestHistoryClick = () => {
    // Use the navigate function to redirect to the Test History page
    navigate('/dashboard/test-taken');
    setMenuData('tests-taken')
  };

  const handleEmploymentDBClick = () => {
    // Use the navigate function to redirect to the Employment DB page
    navigate('/dashboard/employment-db');
    setMenuData('employment-db')
  };

  const handleLeaderBoardClick = () => {
    // Use the navigate function to redirect to the leaderboard page
    navigate('/dashboard/leaderboard');
    setMenuData('leaderboard')
  };

  const handleAccountCircleClick = () => {
    // Handle the click on the AccountCircleIcon here
    // You can display a popup card with the user's name and a logout button
    // For simplicity, I'll just show an alert for now
    if(showProfile) setShowProfile(false)
    else setShowProfile(true)
  };

  const handleResourcesClick = () =>{
    navigate('/dashboard/resources');
    setMenuData('resources')
  }

  useEffect(()=>{
    if(sessionStorage.getItem('myUseremail')){
      setUserEmail(JSON.parse(sessionStorage.getItem('myUseremail')).username)
    }
  },[])

  return (
    <Box sx={{ display: "flex" }}>
      <ProfileCard showProfile={showProfile} />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <h2 className="font-Pacifico" style={{ flex: 8 }}>SkillPulse</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={handleAccountCircleClick}>
              <Avatar
                alt="X"
                src={`https://avatars.dicebear.com/api/identicon/${userEmail}.svg`}
                sx={{ width: 35, height: 35, border: '2px solid #fff' }} // Adjust the width and height as needed
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>

          <ListItem sx={{textAlign:'center', fontWeight:'bold'}} key="Dashboard" disablePadding>
            <ListItemText primary={menuData.toUpperCase()} />
          </ListItem>
          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Dashboard" disablePadding>
            <ListItemButton onClick={handleDashboardClick}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Tests Taken" disablePadding>
            <ListItemButton onClick={handleTestHistoryClick}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Tests Taken" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Employment DB" disablePadding>
            <ListItemButton onClick={handleEmploymentDBClick}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Employment DB" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Leaderboard" disablePadding>
            <ListItemButton onClick={handleLeaderBoardClick}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Resources" disablePadding>
            <ListItemButton onClick={handleResourcesClick}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Main open={open}>
        {menuData==='dashboard' && <Dashboard />}
        {menuData==='tests-taken' && <TestsTaken />}
        {menuData==='employment-db' && <EmploymentDB />}
        {menuData==='leaderboard' && <Leaderboard />}
        {menuData==='resources' && <Resources />}

        <Routes>
          <Route
            path="/dashboard"
            element={<Outlet />}
          >
            {/* Render the default component here */}
            <Route
              index
              element={
                  <Dashboard />
              }
            />
            <Route
              path="tests-taken"
              element={
                  <TestsTaken />
              }
            />
            <Route
              path="employment-db"
              element={
                  <EmploymentDB />
              }
            />
            <Route
              path="leaderboard"
              element={
                  <Leaderboard />
              }
            />
            <Route
              path="resources"
              element={
                  <Resources />
              }
            />
          </Route>
        </Routes>
        


      </Main>
    </Box>
  );
}
