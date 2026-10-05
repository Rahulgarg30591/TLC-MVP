import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './InvitePopup.styles';
import AlertReact from '../../../Components/Alert/AlertReact';
import { inviteVolunteer } from '../../../apis/volunteers';
import { useMutation } from '@tanstack/react-query';
import { validateInvite } from '../../../utils/utils';
import UserContext from '../../../store/userContext';

function InvitePopup({ hideInviteModal, hideInviteModalAndShowSuccess }) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);

  const [roleDropdown, setRoleDropdown] = useState('volunteer');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [signupPath, setSignupPath] = useState('');
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { user } = useContext(UserContext);
  const { mutate, isPending } = useMutation({
    mutationFn: inviteVolunteer,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        setSignupPath(data.signupPath || '');
        setAlertType({
          type: 'success',
          message: data.message,
        });
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const sendInvite = function (e) {
    e.preventDefault();
    const body = {
      isAdmin: roleDropdown === 'admin' ? 'true' : 'false',
      name: fullName.trim(),
      phoneNumber: phone,
      email,
    };

    const isValid = validateInvite(body);
    if (isValid.type) return setAlertType(isValid);
    mutate({ data: body, key: user?.key });
  };

  return (
    <>
      <Dialog open={open} className={classes.Dialog}>
        <DialogTitle className={classes.TitleAndClose}>
          <Typography>Invite by phone</Typography>
          <IconButton
            className={classes.CloseIcon}
            disableRipple
            onClick={() => {
              SetOpen(false);
              hideInviteModal();
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.DiaogContent}>
          {alertType && (
            <AlertReact
              removeAlertType={removeAlertType}
              type={alertType.type}
              message={alertType.message}
              zIndex={999}
              componentType={'popup'}
            />
          )}
          {/* name */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="fullNameField">Name</FormLabel>
              <TextField
                id="fullNameField"
                placeholder="Enter Name"
                name="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </FormControl>
          </Box>
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="phoneField">Phone number</FormLabel>
              <TextField
                id="phoneField"
                placeholder="10-digit mobile number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ inputMode: 'tel' }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="emailField">Email address</FormLabel>
              <TextField
                type="email"
                id="emailField"
                placeholder="Optional extra"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            {/* role */}
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
              <Select
                id="roleSelectBox"
                name="role"
                IconComponent={ExpandMoreOutlinedIcon}
                className={classes.selectBox}
                MenuProps={{
                  classes: {
                    paper: classes.selectDropdownMenu,
                  },
                }}
                value={roleDropdown}
                onChange={(e) => {
                  setRoleDropdown(e.target.value);
                }}
              >
                <MenuItem value="volunteer">Volunteer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        {/* action buttons */}
        {signupPath && (
          <Box sx={{ px: 3, pb: 1 }}>
            <Typography sx={{ fontSize: 13, color: '#5a5040', mb: 1 }}>
              Share this link. They register with the phone number above.
            </Typography>
            <TextField
              fullWidth
              value={`${window.location.origin}${signupPath}`}
              InputProps={{ readOnly: true }}
            />
          </Box>
        )}
        <DialogActions className={classes.DialogActions}>
          <Button
            className="cancelBtn"
            disableRipple
            onClick={() => {
              hideInviteModal();
              SetOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="inviteBtn"
            disableRipple
            onClick={signupPath ? () => {
              hideInviteModalAndShowSuccess();
              SetOpen(false);
            } : sendInvite}
          >
            {isPending ? 'Loading...' : signupPath ? 'Done' : 'Create invite'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InvitePopup;
