import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {ping} from '../actions/ping';
import api from '../api';

const App = () => {

  useEffect(() => {
    ping();
  }, [])

  return (
    <div className="App"></div>
  );
};

export default connect(null, {ping})(App);