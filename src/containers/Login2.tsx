import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {login} from '../actions/login';
import {changePage} from '../actions/page';
import { IloginBody } from '../interfaces';

interface Props {
  login: (body: IloginBody) => void;
  changePage: (page : string) => void;
};

const Login = ({login, changePage} : Props) => {

  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [pwordError, setPwordError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/;
    if (!re.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    };
  }, [email]);

  useEffect(() => {
    if (pword.length > 0) {
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

  const ShowButtons = () => {
    return (
      <div className='form-buttons'>
        <button 
          className='green'
          onClick={() => login({email, pword})}
        >
          Login
        </button>
      </div>
    );
  };

  const handleEnter = () => {
    if (anyError) {
      return;
    } else {
      login({email, pword});
    };
  };

  return (
    <>
      <div className='minusLogo'>
        <h1>LOGIN</h1>
        <div className='form-box'>
          <label>Email:</label>
          <input 
            className={emailError ? 'error' : ''}
            value={email}
            onChange={e => setEmail(e.target.value.toLowerCase())}
            onKeyDown={e => e.code === 'Enter' ? handleEnter() : null}
          />
          <label>Password:</label>
          <input
            className={pwordError ? 'error' : ''}
            type='password'
            value={pword}
            onChange={e => setPword(e.target.value)}
            onKeyDown={e => e.code === 'Enter' ? handleEnter() : null}
          />
          {!anyError ? <ShowButtons /> : null}
          <p 
            className='fake-link'
            onClick={() => changePage('createAccount')}
          >
            Create Account
          </p>
        </div>
      </div>
    </>
  )
};

const mapDispatchToProps = {
  login,
  changePage
};

export default connect(null, mapDispatchToProps)(Login);