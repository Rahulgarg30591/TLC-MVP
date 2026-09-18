import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useContext } from 'react';
import { useStyles } from './Sidebar.styles';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../.././assets/Icons/dashboardIcon.svg';
import { ReactComponent as EnrollmentIcon } from '../.././assets/Icons/enrollmentIcon.svg';
import { ReactComponent as VolunteerIcon } from '../.././assets/Icons/volunteerIcon.svg';
import { ReactComponent as MeetingsIcon } from '../.././assets/Icons/meetingsIcon.svg';
import { ReactComponent as WorkshopIcon } from '../.././assets/Icons/workshopIcon.svg';
import logo from '../../assets/Icons/tlcLogo.png';
import UserContext from '../../store/userContext';

const Sidebar = ({ open, handleSidebarOpen }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const belowMedium = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const sideBarRoute = [
    { id: 0, path: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
    { id: 1, path: 'volunteers', name: 'Volunteers', icon: <VolunteerIcon /> },
    { id: 2, path: 'workshops', name: 'Workshops', icon: <WorkshopIcon /> },
    { id: 3, path: 'meetings', name: 'Meetings', icon: <MeetingsIcon /> },
    {
      id: 4,
      path: 'enrollments',
      name: 'Enrollments',
      icon: <EnrollmentIcon />,
    },
  ];

  const initials = (user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <Drawer
      variant={belowMedium ? 'temporary' : 'persistent'}
      open={isLargerScreen ? true : open}
      className={classes.root}
      onClose={() => handleSidebarOpen()}
    >
      <Toolbar />
      <Box className={classes.brand}>
        <img src={logo} alt="" className={classes.brandLogo} />
        <Box>
          <Typography className={classes.brandName}>The Last Centre</Typography>
          <Typography className={classes.brandTag}>Operations</Typography>
        </Box>
      </Box>
      <Typography className={classes.sectionLabel}>Navigate</Typography>
      <Box className={classes.navList}>
        {sideBarRoute.map((links) => (
          <ListItem
            key={links.id}
            className={classes.sideBarLinks}
            style={{ animationDelay: `${80 + links.id * 70}ms` }}
          >
            <ListItemButton
              LinkComponent={NavLink}
              to={links.path}
              className={classes.navlink}
              onClick={() => handleSidebarOpen()}
            >
              <ListItemIcon className="sidebarIcon">{links.icon}</ListItemIcon>
              <ListItemText className="sidebarText" primary={links.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
      <Box className={classes.footer}>
        <span className={classes.footerAvatar}>{initials}</span>
        <Box className={classes.footerMeta}>
          <Typography className="name">{user?.name}</Typography>
          <Typography className="role">
            {user?.isAdmin ? 'Admin' : 'Volunteer'}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
