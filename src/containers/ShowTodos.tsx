import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import { getTodos, changeShowTodos } from '../actions/todo';
import { changePage } from '../actions/page';
import ShowTodo from './ShowTodo';
import { Itodo } from '../interfaces';

interface State {
  todos: Itodo[],
  todosFetched: boolean;
  // showTodos: 'active' | 'all'
};

interface Props extends State {
  getTodos: () => void;
  changePage: (page : string) => void;
  changeShowTodos: (str : 'active' | 'all') => void;
};

const ShowTodos = ({todos, todosFetched, getTodos, changePage} : Props) => {

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

const mapStateToProps = ({todos, todosFetched} : State) => {
  return {
    todos,
    todosFetched,
  };
};

const mapDispatchToProps = {
  getTodos,
  changePage,
  changeShowTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);