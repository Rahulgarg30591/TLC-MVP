import { Backdrop, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Loader.styles';
import logo from '../../assets/Icons/tlcLogo.png';

function Loader({ isDashboard = false, compact = false }) {
  const classes = useStyles();
  const mark = (
    <div className={`${classes.inner} ${compact ? 'compact' : ''}`}>
      <img src={logo} alt="The Last Centre" className={classes.logo} />
      <div className={classes.track} aria-hidden>
        <span className={classes.bar} />
      </div>
      {!compact && (
        <Typography className={classes.label}>Loading your workspace</Typography>
      )}
    </div>
  );

  if (compact) return mark;

  return (
    <Backdrop
      open
      className={isDashboard ? classes.dashboardLoader : classes.loaderRoot}
    >
      {mark}
    </Backdrop>
  );
}

export default Loader;
