import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import React, { useEffect, useState } from 'react';
import { login } from '../actions/login';
import { changePage } from '../actions/page';

import { connect } from 'react-redux';
import { IloginBody } from '../interfaces';

interface Props {
  login: (body : IloginBody) => void;
  changePage: (page : string) => void;
};

const Login = ({login, changePage} : Props) => {

  const [email, setEmail] = useState <string> ('');
  const [emailError, setEmailError] = useState <boolean> (false);
  const [pword, setPword] = useState <string> ('');
  const [pwordError, setPwordError] = useState <boolean> (false);
  const [anyError, setAnyError] = useState <boolean> (false);

  useEffect(() => {
    const re = /^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/;
    setEmailError(!re.test(email));
  }, [email]);

  useEffect(() => {
    if (pword) {
      setPwordError(false);
    } else {
      setPwordError(true);
    };
  }, [pword]);

  useEffect(() => {
    if (emailError || pwordError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [emailError, pwordError]);

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError) {
      return;
    };
    login({email, pword});
  };

  return (
    <Grid container>
      <Grid item xs={0} sm={2} md={3}/>
      <Grid item xs={12} sm={8} md={6}>
        <Grid 
          container
          direction='column'
        >
          <Grid 
            container 
            spacing={1} 
            padding={1} 
            direction='column' 
            component='form' 
            onSubmit={handleSubmit}
          >
            <Grid item>
              <Typography
                variant='h2'
                align='center'
              >
                Login
              </Typography>
            </Grid>
            <Grid item>
              <TextField 
                fullWidth
                variant='standard' 
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={emailError}
                autoFocus={true}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant='standard'
                type='password'
                label='Password'
                value={pword}
                onChange={e => setPword(e.target.value)}
                error={pwordError}
              />
            </Grid>
            <Grid container>
              <Grid item xs={0} sm={2} md={3} />
              <Grid item xs={12} sm={8} md={6}>
                <Grid 
                  container 
                  direction='column' 
                  pt={2} 
                  spacing={2}
                >
                  {!anyError ?
                    <Grid item>
                      <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        color='success'
                      >
                        Login
                      </Button>
                    </Grid>
                  : null}
                  <Grid item>
                    <Button
                      fullWidth
                      variant='text'
                      onClick={() => changePage('createAccount')}
                      >Create An Account</Button>
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
  login, changePage
};

export default connect(null, mapDispatchToProps)(Login);