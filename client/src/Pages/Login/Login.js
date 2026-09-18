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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { login } from '../../apis/user';
import { useMutation } from '@tanstack/react-query';
import AlertReact from '../../Components/Alert/AlertReact';
import logo from '../../assets/Icons/tlcLogo.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../store/userContext';

const FEATURES = [
  'Plan and track workshops',
  'Keep meetings with the right people',
  'Enroll participants by phone',
];

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
        data?.message === 'Please provide email and password!'
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
      <Box className={classes.brandPanel}>
        <span className={`${classes.blob} blobA`} />
        <span className={`${classes.blob} blobB`} />
        <img className={classes.brandLogo} src={logo} alt="The Last Centre" />
        <Typography className={classes.brandCopy}>
          One place for workshops, meetings, volunteers and enrollments.
        </Typography>
        <Box className={classes.featureList}>
          {FEATURES.map((item, i) => (
            <Typography
              key={item}
              className={classes.feature}
              style={{ animationDelay: `${60 + i * 70}ms` }}
            >
              <CheckCircleOutlineIcon />
              {item}
            </Typography>
          ))}
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
                <FormLabel htmlFor="emailField">Email Address</FormLabel>
                <TextField
                  type="email"
                  id="emailField"
                  placeholder="you@thelastcentre.com"
                  name="email"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon className={classes.fieldIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
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
