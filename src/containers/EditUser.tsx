import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setStatus } from '../actions/status';
import { updateUser } from '../actions/user';
import { changePage } from '../actions/page';
import api from '../api/api';
import Logo from './Logo';
import { IupdateUserBody } from '../interfaces';

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

  const handleSubmit = () => {
    if (anyError) {
      return;
    };
    if (name === returned.name && email === returned.email) {
      return;
    };
    updateUser({name, email, pword});
  };

  const ShowButtons = () => {
    return (
      <>
        <div className="form-buttons">
          {!anyError ? 
            <button
              className='green'
              onClick={handleSubmit}
            >
              Update User
            </button>
            : null
          }
          <button 
            className='red'
            onClick={() => changePage('home')}
          >
            Cancel
          </button>
        </div>

        <div className='form-buttons'>
          <button
            className='blue'
            onClick={() => changePage('updatePassword')}
          >Update Password</button>
        </div>
      </>
    );
  };

  return (
    <>
      <Logo />
      <div className='minusLogo'>
        <h1>Edit Your Details</h1>
        {loading ?
          <div className='spinner' />
      :
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
            className={pwordError ? 'error' : ''}
            value={pword}
            onChange={e => setPword(e.target.value)}
            type='password'
            />
          <ShowButtons />
        </div>
        }
      </div>
    </>
  );
};

const mapDispatchToProps = {
  updateUser,
  setStatus,
  changePage
}

export default connect(null, mapDispatchToProps)(EditUser);