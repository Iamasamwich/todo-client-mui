import React from 'react';

interface Todo {
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
};

const ShowTodo = ({todo} : Props) => {

  const ShowDueDate = () => {
    return (
      <h3>
        Due in XX days
      </h3>
    );
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
        <div className='todo-box-icon'>{'\u2713'}</div>
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

export default ShowTodo;