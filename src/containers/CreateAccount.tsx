import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions/user';
import Logo from './Logo';

interface Props {
  createAccount : (body : {name : string; email : string; pword : string}) => void;
};

const CreateAccount = ({createAccount} : Props) => {

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

  const ShowButtons = () => {
    return (
      <div className="form-buttons">
        {!anyError ? 
          <button
            className='green'
            onClick={() => createAccount({name, email, pword})}
          >
            Sign Up
          </button>
          : null
        }
        <button className='red'>
          Cancel
        </button>
      </div>
    );
  };

  return (
    <>
      <Logo />
      <div className='minusLogo'>
        <h1>CREATE ACCOUNT</h1>
        <div className='form-box'>
          <label>Name:</label>
          <input
            className={nameError ? 'error' : ''}
            value={name}
            onChange={e => setName(e.target.value)}

          />
          <label>Email:</label>
          <input
            className={emailError ? 'error' : ''}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type='password'
            className={pwordError ? 'error' : ''}
            value={pword}
            onChange={e => setPword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type='password'
            className={confPwordError ? 'error' : ''}
            value={confPword}
            onChange={e => setConfPword(e.target.value)}
          />
          <ShowButtons />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  createAccount
};

export default connect(null, mapDispatchToProps)(CreateAccount);