import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {ping} from '../actions/ping';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Status from './Status';
import ShowTodos from './ShowTodos';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import EditUser from './EditUser';

interface State {
  login: boolean;
  page: string;
};

interface Props extends State {
  ping: () => void;
};

const App = ({login, page, ping} : Props) => {

  useEffect(() => {
    ping();
  }, [ping]);

  const ShowPage = () => {
    if (!login) {
      switch (page) {
        case 'createAccount':
          return <CreateAccount />;
        default: 
          return <Login />;
      };
    } else {
      switch (page) {
        case 'todos':
          return <ShowTodos />;
        case 'addTodo':
          return <AddTodo />;
        case 'editTodo':
          return <EditTodo />;
        case 'editUser':
          return <EditUser />
        default: 
          return <ShowTodos />;
      };
    };
  };

  return (
    <div className="App">
      <Status />
      <ShowPage />
    </div>
  );
};

const mapStateToProps = ({login, page} : State) => {
  
  return {
    login, 
    page
  }
}

export default connect(mapStateToProps, {ping})(App);