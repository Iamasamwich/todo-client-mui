import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import {Todo} from '../reducers/todoReducer';
import { getTodos } from '../actions/todo';
import { changePage } from '../actions/page';

interface State {
  todos: Todo[]
}

interface Props extends State {
  getTodos: () => void;
  changePage: (page : string) => void;
};

const ShowTodos = ({todos, getTodos, changePage} : Props) => {

  useEffect(() => {
    getTodos();
  }, [getTodos]);
  
  return (
    <>
      <Logo />
      <div className='minusLogo'>
        <div className="form-buttons">
          <button 
            className='green'
            onClick={() => changePage('addTodo')}
          >
            Add A Todo
          </button>
        </div>
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
  getTodos,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);