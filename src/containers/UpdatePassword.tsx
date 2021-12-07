import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { changePage } from '../actions/page';
import { IupdatePwordBody } from '../interfaces';
import { updatePassword } from '../actions/user';

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
    <Grid container>
      <Grid item xs={0} sm={2} md={3} />
      <Grid item xs={12} sm={8} md={6}>
        <Grid 
          container
          direction='column'
          component='form'
          onSubmit={handleSubmit}
          padding={2}
          spacing={2}
        >
          <Grid item>
            <Typography
              variant='h2'
              align='center'
            >
              Update Your Password
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant='standard'
              label='Old Password'
              type='password'
              value={pword}
              onChange={e => setPword(e.target.value)}
              error={pwordError}
              autoFocus={true}
            />
          </Grid>
          <Grid item>
            <TextField 
              fullWidth
              variant='standard'
              label='New Password'
              type='password'
              value={newPword}
              onChange={e => setNewPword(e.target.value)}
              error={newPwordError}
            />
          </Grid>
          {!newPwordError &&
            <Grid item>
              <TextField 
                fullWidth
                variant='standard'
                label='Confirm New Password'
                type='password'
                value={confirmNewPword}
                onChange={e => setConfirmNewPword(e.target.value)}
                error={confirmNewPwordError}
              />
            </Grid>
          }
          <Grid item>
            <Grid container>
              <Grid item xs={0} sm={2} md={3} />
              <Grid item xs={12} sm={9} md={6}>
                <Grid container direction='column' p={2} spacing={2}>
                  {!anyError && 
                    <Grid item>
                      <Button
                        fullWidth
                        variant='contained'
                        color='success'
                        type='submit'
                      >
                        Update
                      </Button>
                    </Grid>
                  }
                  <Grid item>
                    <Button
                      fullWidth
                      variant='contained'
                      color='warning'
                      onClick={() => changePage('home')}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  changePage,
  updatePassword
}

export default connect(null, mapDispatchToProps)(UpdatePassword);