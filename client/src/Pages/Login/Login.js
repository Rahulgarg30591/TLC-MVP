import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Login.styles';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../../apis/user';
import { useMutation } from '@tanstack/react-query';
import AlertReact from '../../Components/Alert/AlertReact';
import logo from '../../assets/Icons/tlcLogo.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../store/userContext';

function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [alertType, setAlertType] = useState();
  const { setUser } = useContext(UserContext);

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (
        data.status === 'error' ||
        data?.message === 'Please provide your phone number and password!'
      ) {
        setAlertType({
          type: data.status || 'error',
          message: data.message,
        });
      } else {
        setUser(data?.user);
        const keys = {
          id: data?.user?.email,
          key: data?.user?.key,
        };
        localStorage.setItem('keys', JSON.stringify(keys));
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    mutate({ ...body });
  };

  return (
    <Box className={classes.root}>
      {alertType && (
        <AlertReact
          removeAlertType={removeAlertType}
          type={alertType.type}
          message={alertType.message}
        />
      )}
      <Box className={classes.panel}>
        <Typography className={`${classes.eyebrow} loginEyebrow`}>
          Our philosophy
        </Typography>
        <Typography className={`${classes.panelTitle} loginDisplay`}>
          Not a solution, but a quest.
        </Typography>
        <Typography className={`${classes.panelCopy} loginCopy`}>
          An exploration of life’s fundamental questions, in pursuit of joy,
          creativity, and fulfillment.
        </Typography>
        <Box className={classes.panelList}>
          {['Who am I?', 'What am I doing?', 'What do I truly want?'].map(
            (item) => (
              <Typography key={item} className={`${classes.panelItem} loginCopy`}>
                {item}
              </Typography>
            )
          )}
        </Box>
      </Box>
      <Box className={classes.formColumn}>
        <Box className={classes.mainWrapper}>
          <img className={classes.logo} src={logo} alt="The Last Center Logo" />
          <Box className={classes.headingBlock}>
            <Typography className={classes.welcome}>Welcome back</Typography>
            <Typography className={classes.header}>
              Sign in to <span>The Last Centre</span>
            </Typography>
          </Box>
          <Box className={classes.formWrapper}>
            <form className={classes.form} onSubmit={handleSignInSubmit}>
              <FormControl required className={classes.formControl}>
                <FormLabel htmlFor="emailField">Phone number</FormLabel>
                <TextField
                  type="text"
                  id="emailField"
                  placeholder="10-digit mobile number"
                  name="email"
                  required
                  inputProps={{ inputMode: 'tel', autoComplete: 'username' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon className={classes.fieldIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className={classes.fieldHint}>
                  Email also works when the account has one.
                </Typography>
              </FormControl>
              <Box className={classes.FormElementInBox}>
                <FormControl required className={classes.formControl}>
                  <FormLabel htmlFor="passwordField">Password</FormLabel>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    id="passwordField"
                    name="password"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon className={classes.fieldIcon} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disableRipple
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Link to={'/forgotPass'} className="forgotPassword">
                  Forgot Password?
                </Link>
              </Box>
              <Box className={classes.FormElementInBox}>
                <Button
                  type="submit"
                  disableRipple
                  disabled={isPending}
                  className={`${classes.signInBtn} continueBtn`}
                >
                  {isPending ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    'Continue'
                  )}
                </Button>
                <Typography>
                  Don't have an account?{' '}
                  <Link to={'/signup'} className="signup">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
