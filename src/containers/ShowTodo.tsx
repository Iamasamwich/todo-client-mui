import React from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../actions/todo';

export interface Todo {
  id: number;
  todo: string;
  done: boolean;
  dueDate: string;
  steps: {
    step: string;
    done: boolean;
    id: number;
    todoId: number;
  }[];
};

interface Props {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
};

const ShowTodo = ({todo, updateTodo} : Props) => {

  const ShowDueDate = () => {

    const due = new Date(todo.dueDate).getTime();
    const now = new Date().getTime();
    const diffTime = due - now;
    const daysTilDue = Math.ceil(diffTime / (1000 * 3600 * 24));
    let text : string;
    if (daysTilDue < 0) {
      text = `${Math.abs(daysTilDue)} days overdue!`
    } else if (daysTilDue === 0) {
      text = 'Due today!';
    } else {
      text = `${daysTilDue} days until due.`
    };

    return <h3>{text}</h3>
  };

  const ShowStepsCount = () => {
    const stepCount = todo.steps.length;
    let text;

    if (stepCount === 0) {
      text = 'No Steps';
    } else {
      const done = todo.steps.filter(step => {
        return step.done;
      });
      text = `${done.length}/${stepCount} steps completed`;
    };

    return <h3>{text}</h3>
  };
  
  return (
    <div className="todo-box">
      <div className='todo-box-icons'>
        <div 
          className='todo-box-icon'
          onClick={() => updateTodo({...todo, done: todo.done ? false : true})}
        >
          {todo.done ? '\u274c' : '\u2713'}
        </div>
        <div className='todo-box-icon'>{'\u2630'}</div>
      </div>
      <div className="todo-box-text">
        <div className='todo-box-top'>
          <h2>{todo.todo}</h2>
        </div>
        <div className='todo-box-bottom'>
          <ShowDueDate />
          <ShowStepsCount />
        </div>

      </div>
    </div>
  )
};

const mapDispatchToProps = {
  updateTodo
};

export default connect(null, mapDispatchToProps)(ShowTodo);