import { Typography, Box, TextField, Button, Stack } from '@mui/material';
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    > 
      <Typography
        variant='h2'
        align='center'
      >
        Login
      </Typography>
      <Box 
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          width: '50%'
        }}
      >
        <TextField 
          variant='standard' 
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={emailError}
        />
        <TextField
          variant='standard'
          type='password'
          label='Password'
          value={pword}
          onChange={e => setPword(e.target.value)}
          error={pwordError}
        />
        <Stack
          pt={2}
          spacing={2}
        >
          {!anyError ?
            <Button
              variant='contained'
              type='submit'
              color='success'
            >
              Login
            </Button>
          : null}
          <Button
            variant='text'
            onClick={() => changePage('createAccount')}
            >Create An Account</Button>
        </Stack>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  login, changePage
};

export default connect(null, mapDispatchToProps)(Login);