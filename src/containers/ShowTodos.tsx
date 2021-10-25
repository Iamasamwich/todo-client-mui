import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import { Todo } from '../reducers/todoReducer';
import { getTodos, changeShowTodos } from '../actions/todo';
import { changePage } from '../actions/page';
import ShowTodo from './ShowTodo';

interface State {
  todos: Todo[],
  todosFetched: boolean;
  showTodos: 'active' | 'all'
}

interface Props extends State {
  getTodos: () => void;
  changePage: (page : string) => void;
  changeShowTodos: (str : 'active' | 'all') => void;
};

const ShowTodos = ({todos, todosFetched, showTodos, getTodos, changePage, changeShowTodos} : Props) => {

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
          <button
            onClick={() => changeShowTodos(showTodos === 'active' ? 'all' : 'active')}
          >
            {showTodos === 'active' ? 
              'Show All Todos'
              : 
              'Show Active Todos'
            }
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

const mapStateToProps = ({todos, todosFetched, showTodos} : State) => {
  return {
    todos,
    todosFetched,
    showTodos
  };
};

const mapDispatchToProps = {
  getTodos,
  changePage,
  changeShowTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);