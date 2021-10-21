import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import {Todo} from '../reducers/todoReducer';
import { getTodos } from '../actions/todo';

interface State {
  todos: Todo[]
}

interface Props extends State {
  getTodos: () => void;
};

const ShowTodos = ({todos, getTodos} : Props) => {

  useEffect(() => {
    getTodos();
  }, [getTodos]);
  
  return (
    <>
      <Logo />
      <div className='minusLogo'>
        
        Show todos
      </div>
    </>
  );
};

const mapStateToProps = ({todos} : State) => {
  return {
    todos
  };
};

const mapDispatchToProps = {
  getTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);