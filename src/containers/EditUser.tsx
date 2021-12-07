import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setStatus } from '../actions/status';
import { updateUser } from '../actions/user';
import { changePage } from '../actions/page';
import api from '../api/api';
import { IupdateUserBody } from '../interfaces';

import styles from '../styles/styles';

interface Props {
  updateUser: (user : IupdateUserBody) => void;
  setStatus: (status : string | number | null) => void;
  changePage: (page : string) => void;
}

const EditUser = ({updateUser, setStatus, changePage} : Props) => {

  const [loading, setLoading] = useState <boolean> (false);

  const [returned, setReturned] = useState <{name: string, email: string}> ({name: '', email: ''});

  const [name, setName] = useState <string> ('');
  const [email, setEmail] = useState <string> ('');
  const [pword, setPword] = useState <string> ('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwordError, setPwordError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      await api('/user', "GET")
      .then(resp => {
        if (resp.status === 200) {
          setLoading(false);
          setReturned(resp.user);
          setName(resp.user.name);
          setEmail(resp.user.email);
          return;
        } else {
          setStatus(resp.status);
        };
      })
      .catch(err => {});
    };
    getDetails();
  }, [setStatus]);

  useEffect(() => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    };
  }, [name]);

  useEffect(() => {
    const re = /^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/;
    if (re.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    };
  }, [email]);

  useEffect(() => {
    if (!pword) {
      setPwordError(true);
    } else {
      setPwordError(false);
    };
  }, [pword]);

  useEffect(() => {
    if (!nameError && !emailError && !pwordError) {
      setAnyError(false);
    } else {
      setAnyError(true);
    };
  }, [nameError, emailError, pwordError]);

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError) {
      return;
    };
    if (name === returned.name && email === returned.email) {
      return;
    };
    updateUser({name, email, pword});
  };

  return (
    <Grid container>
      <Grid item xs={0} sm={2} md={3} />
      <Grid item xs={12} sm={8} md={6}>
        <Grid item>
          <Typography
            variant='h2'
            align='center'
          >
            Update Your Details
          </Typography>
        </Grid>
        {loading ? <Box sx={styles.spinner} />
          :
          <Grid 
            container
            component='form'
            direction='column'
            onSubmit={handleSubmit}
          >
            <Grid item>
              <TextField
                fullWidth
                variant='standard'
                label='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                error={nameError}
                autoFocus={true}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant='standard'
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={emailError}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant='standard'
                label='Password'
                type='password'
                value={pword}
                onChange={e => setPword(e.target.value)}
                error={pwordError}
              />
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item xs={0} sm={2} lg={3} />
                <Grid item xs={12} sm={8} lg={6}>
                  <Grid 
                    container 
                    direction='column'
                    padding={2}
                    spacing={2}
                  >
                    {!anyError &&
                      <Grid item>
                        <Button
                          fullWidth
                          variant='contained'
                          color='success'
                          type='submit'
                        >
                          Update Details
                        </Button>

                      </Grid>
                    }
                    <Grid item>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => changePage('updatePassword')}
                      >
                        Update Password
                      </Button>
                    </Grid>
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
        }
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  updateUser,
  setStatus,
  changePage
}

export default connect(null, mapDispatchToProps)(EditUser);