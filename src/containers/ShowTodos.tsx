import React, { useEffect, useState } from 'react';
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

  const [allOrActive, setAllOrActive] = useState <'all' | 'active'>('active');

  useEffect(() => {
    if (!todosFetched) {
      getTodos();
    };
  }, [getTodos, todosFetched]);

  const selectedTodos = () => {
    if (allOrActive === 'active') {
      return todos.filter(todo => {
        return !todo.done ? todo : null;
      });
    } else {
      return todos;
    };
  };

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
            onClick={() => setAllOrActive(allOrActive === 'active' ? 'all' : 'active')}
          >
            {allOrActive === 'active' ? 
              'Show All Todos'
              : 
              'Show Active Todos'
            }
          </button>
        </div>

        <div className='todos-box'>
          {selectedTodos().map(todo => {
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