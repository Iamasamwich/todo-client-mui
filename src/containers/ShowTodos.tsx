import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import { Todo } from '../reducers/todoReducer';
import { getTodos } from '../actions/todo';
import { changePage } from '../actions/page';
import ShowTodo from './ShowTodo';

interface State {
  todos: Todo[],
  todosFetched: boolean;
}

interface Props extends State {
  getTodos: () => void;
  changePage: (page : string) => void;
};

const ShowTodos = ({todos, todosFetched, getTodos, changePage} : Props) => {

  useEffect(() => {
    if (!todosFetched) {
      getTodos();
    };
  }, [getTodos, todosFetched]);

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
        <div className='todos-box'>
          {todos.map(todo => {
            return <ShowTodo todo={todo} key={todo.id} />
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({todos, todosFetched} : State) => {
  return {
    todos,
    todosFetched
  };
};

const mapDispatchToProps = {
  getTodos,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);