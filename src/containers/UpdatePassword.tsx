import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { changePage } from '../actions/page';
import { IupdatePwordBody } from '../interfaces';
import { updatePassword } from '../actions/user';
import styles from '../styles/styles';

interface Props {
  changePage: (page : string) => void;
  updatePassword: (body: IupdatePwordBody) => void;
}

const UpdatePassword = ({changePage, updatePassword} : Props) => {

  const [pword, setPword] = useState <string> ('');
  const [newPword, setNewPword] = useState <string> ('');
  const [confirmNewPword, setConfirmNewPword] = useState <string> ('');

  const [pwordError, setPwordError] = useState <boolean> (false);
  const [newPwordError, setNewPwordError] = useState <boolean> (false);
  const [confirmNewPwordError, setConfirmNewPwordError] = useState <boolean> (false);

  const [anyError, setAnyError] = useState <boolean> (false);

  useEffect(() => {
    if (!pword) {
      setPwordError(true);
    } else {
      setPwordError(false);
    };
  }, [pword]);

  useEffect(() => {
    if (!newPword) {
      setNewPwordError(true);
    } else {
      setNewPwordError(false);
    };
  }, [newPword]);

  useEffect(() => {
    if (!confirmNewPword || confirmNewPword !== newPword) {
      setConfirmNewPwordError(true);
    } else {
      setConfirmNewPwordError(false);
    };
  }, [confirmNewPword, newPword]);

  useEffect(() => {
    if (pwordError || newPwordError || confirmNewPwordError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [pwordError, newPwordError, confirmNewPwordError])

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError || pword === newPword) {
      return;
    } else {
      updatePassword({pword, newPword});
    };
  };

  return (
    <Box sx={styles.main}>
      <Typography
        variant='h2'
        align='center'
      >
        Update Your Password
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <TextField
          variant='standard'
          label='Old Password'
          type='password'
          value={pword}
          onChange={e => setPword(e.target.value)}
          error={pwordError}
          autoFocus={true}
        />
        <TextField 
          variant='standard'
          label='New Password'
          type='password'
          value={newPword}
          onChange={e => setNewPword(e.target.value)}
          error={newPwordError}
        />
        {newPwordError ? null :
          <TextField 
            variant='standard'
            label='Confirm New Password'
            type='password'
            value={confirmNewPword}
            onChange={e => setConfirmNewPword(e.target.value)}
            error={confirmNewPwordError}
          />
        }
        <Stack
          pt={2}
          spacing={2}
        >
          {anyError ? null :
            <Button
              variant='contained'
              color='success'
              type='submit'
            >
              Update
            </Button>
          }
          <Button
            variant='contained'
            color='warning'
            onClick={() => changePage('home')}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  changePage,
  updatePassword
}

export default connect(null, mapDispatchToProps)(UpdatePassword);