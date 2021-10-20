import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {ping} from '../actions/ping';

import Login from './Login';
import Status from './Status';

interface RootState {
  login: boolean;
  appStatus: string | number;
};

interface Props {
  login: boolean;
  appStatus: string | number;
}

const App = ({login, appStatus} : Props) => {

  useEffect(() => {
    ping();
  }, []);

  console.log('appStatus', appStatus);

  return (
    <div className="App">
      {
        appStatus ? 
        <Status />
        : null
      }
      { 
        login ? 
        <div> logged in</div>
        : 
        <Login />
      }
    </div>
  );
};

const mapStateToProps = (state : RootState) => {
  return {
    login: state.login,
    appStatus: state.appStatus
  }
}

export default connect(mapStateToProps, {ping})(App);