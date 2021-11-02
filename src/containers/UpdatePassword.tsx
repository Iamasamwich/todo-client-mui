import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { changePage } from '../actions/page';
import { IupdatePwordBody } from '../interfaces';
import { updatePassword } from '../actions/user';
import Logo from './Logo';

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

  const handleSubmit = () => {
    if (anyError || pword === newPword) {
      console.log('returning');
      
      return;
    } else {
      console.log('submitting');
      console.log({pword, newPword});
      updatePassword({pword, newPword});
    };
  };

  const handleEnter = (e : React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleSubmit();
    };
  };

  const ShowButtons = () => {
    return (
      <div className='form-buttons'>
        {
          anyError ?
          null
        :  
          <button
            className='green'
            onClick={() => handleSubmit()}
          >
            Update
          </button>
        }
        <button
          className='red'
          onClick={() => changePage('home')}
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <>
      <Logo />
      <div className='minusLogo'>
        <h1>Update Your Password</h1>

        <div className='form-box'>
          <label>Old Password:</label>
          <input
            type='password'
            onKeyDown={e => handleEnter(e)}
            className={pwordError ? 'error' : ''}
            value={pword}
            onChange={e => setPword(e.target.value)}
          />

          <label>New Password:</label>
          <input
            type='password'
            onKeyDown={e => handleEnter(e)}
            className={newPwordError ? 'error' : ''}
            value={newPword}
            onChange={e => setNewPword(e.target.value)}
          />

          {newPwordError ? 
          null
          :  
            <>
              <label>Confirm New Password:</label>
              <input
                type='password'
                onKeyDown={e => handleEnter(e)}
                className={confirmNewPwordError ? 'error' : ''}  
                value={confirmNewPword}
                onChange={e => setConfirmNewPword(e.target.value)}
              />
            </>
          }
          <ShowButtons />
        </div>

      </div>
    </>
  );
};

const mapDispatchToProps = {
  changePage,
  updatePassword
}

export default connect(null, mapDispatchToProps)(UpdatePassword);