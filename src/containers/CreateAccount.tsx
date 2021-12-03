import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions/user';
import { changePage } from '../actions/page';
import { IaddUserBody } from '../interfaces';
import styles from '../styles/styles';

interface Props {
  createAccount : (body : IaddUserBody) => void;
  changePage: (page: 'home') => void;
};

const CreateAccount = ({createAccount, changePage} : Props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [confPword, setConfPword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwordError, setPwordError] = useState(false);
  const [confPwordError, setConfPwordError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    if (name) {
      setNameError(false);
    } else {
      setNameError(true);
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
    if (pword) {
      setPwordError(false);
    } else {
      setPwordError(true);
    };
  }, [pword]);

  useEffect(() => {
    if (confPword && pword === confPword) {
      setConfPwordError(false);
    } else {
      setConfPwordError(true);
    };
  }, [pword, confPword]);

  useEffect(() => {
    if (nameError || emailError || pwordError || confPwordError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [nameError, emailError, pwordError, confPwordError]);

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError) {
      return;
    } else {
      createAccount({name, email, pword});
    };
  };

  return (
    <Box sx={styles.main}>
      <Typography
        variant='h2'
        align='center'
      >
        Create Account
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <TextField
          variant='standard'
          label='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          error={nameError}
          autoFocus={true}
        />
        <TextField
          variant='standard'
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={emailError}
        />
        <TextField
          variant='standard'
          label='Password'
          value={pword}
          onChange={e => setPword(e.target.value)}
          error={pwordError}
          type='password'
        />
        <TextField
          variant='standard'
          label='Confirm Password'
          value={confPword}
          onChange={e => setConfPword(e.target.value)}
          error={confPwordError}
          type='password'
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
              Sign Up!
            </Button>
          : null}
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
  createAccount,
  changePage
};

export default connect(null, mapDispatchToProps)(CreateAccount);