import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {ping} from '../actions/ping';

import Layout from './Layout';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Status from './Status';
import ShowTodos from './ShowTodos';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import EditUser from './EditUser';
import UpdatePassword from './UpdatePassword';

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
        case 'updatePassword':
          return <UpdatePassword />
        default: 
          return <ShowTodos />;
      };
    };
  };

  return (
      <Layout>
        <Status />
        <ShowPage />
      </Layout>
  );
};

const mapStateToProps = ({login, page} : State) => {
  
  return {
    login, 
    page
  }
}

export default connect(mapStateToProps, {ping})(App);