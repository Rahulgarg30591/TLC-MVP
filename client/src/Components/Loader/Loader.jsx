import { Backdrop, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Loader.styles';
import logo from '../../assets/Icons/tlcLogo.png';

function Loader({ isDashboard = false }) {
  const classes = useStyles();
  return (
    <Backdrop
      open
      className={isDashboard ? classes.dashboardLoader : classes.loaderRoot}
    >
      <div className={classes.inner}>
        <div className={classes.ring}>
          <img src={logo} alt="The Last Centre" className={classes.logo} />
        </div>
        <Typography className={classes.label}>Loading</Typography>
      </div>
    </Backdrop>
  );
}

export default Loader;
