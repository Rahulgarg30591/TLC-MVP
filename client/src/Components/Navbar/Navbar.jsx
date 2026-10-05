import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useStyles } from './Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/Icons/tlcLogo.png';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../store/userContext';
import { logStatus } from '../../apis/user';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const Navbar = ({ handleSidebarOpen, isSidebarOpen }) => {
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate();
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    if (!profileOpen) return undefined;
    const closeOnOutside = (event) => {
      if (profileRef.current?.contains(event.target)) return;
      setProfileOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    return () => document.removeEventListener('pointerdown', closeOnOutside);
  }, [profileOpen]);

  const handleSidebar = () => {
    handleSidebarOpen();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setProfileOpen(false);
    const body = {
      email: user?.email,
      key: user?.key,
      isLoggingOut: true,
    };
    await logStatus(body);
    setUser(null);
    localStorage.clear();
    nav('/');
  };
  let userName;
  let userFullName = user?.name ? user.name.split(' ') : 'P';
  if (userFullName.length > 1) {
    userName =
      userFullName[0].substring(0, 1) + userFullName[1].substring(0, 1);
  } else if (userFullName.length == 1) {
    userName = userFullName[0].substring(0, 1);
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar className="toolbar">
        <Box className={classes.logoAndHamburger}>
          {!isLargerScreen && (
            <IconButton
              className="hamIconBtn"
              disableRipple
              onClick={handleSidebar}
            >
              {!isSidebarOpen ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          )}
          <img
            src={logo}
            loading="lazy"
            alt="The Last Center"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              nav('/dashboard');
            }}
          />
        </Box>
        <Box
          ref={profileRef}
          className={classes.profile}
          onClick={() => setProfileOpen((open) => !open)}
        >
          <Avatar>{userName}</Avatar>
          <Box className={classes.userNameAndUserRole}>
            <Typography className="userName" sx={{ color: 'black' }}>
              {user?.name}
            </Typography>
            <Typography className="userRole" sx={{ color: 'black' }}>
              {user?.isAdmin ? 'Admin' : 'Volunteer'}
            </Typography>
          </Box>
          <IconButton className={classes.arrowProfileIcon}>
            <ExpandMoreIcon />
          </IconButton>
          {profileOpen && (
            <Box
              className={classes.profileDropdown}
              onClick={(event) => event.stopPropagation()}
            >
              <Link to="/editprofile" onClick={() => setProfileOpen(false)}>
                <EditOutlinedIcon />
                Edit Profile
              </Link>
              <Link to="/" onClick={handleLogout}>
                <LogoutOutlinedIcon />
                Logout
              </Link>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
