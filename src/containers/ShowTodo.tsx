import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo, editTodo } from '../actions/todo';
import { Itodo } from '../interfaces';
import ShowSteps from './ShowSteps';

interface Props {
  todo: Itodo;
  updateTodo: (todo: Itodo) => void;
  deleteTodo: (todoId: number) => void;
  editTodo: (todoToEdit: Itodo) => void;
};

const ShowTodo = ({todo, updateTodo, deleteTodo, editTodo} : Props) => {

  const [showSteps, setShowSteps] = useState(false)
  const [warning, setWarning] = useState(false);

  const ShowDueDate = () => {

    const d = new Date();
    const todaysDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const now = Math.floor(new Date(todaysDate).getTime() / (1000 * 3600 * 24));
    const due = Math.floor(new Date(todo.dueDate).getTime() / (1000 * 3600 * 24));
    
    const daysTilDue = due - now;
    
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
      {warning ? 
        <div className='delete-todo-warning'>
          <div className='warning-box'>

            <p>You are about to delete a todo!</p>
            <p>This action is not reversable!</p>
            <p>To mark as done click the green tick to the left of the todo.</p>
            <div className='form-buttons'>

              <button
                className='green'
                onClick={() => deleteTodo(todo.id)}
                >DELETE IT!</button>
              <button
                className='red'
                onClick={() => setWarning(false)}
                >Cancel</button>
            </div>

            </div>
          </div>
      : null}
      <div className="todo-box-todo">

        <div className='todo-box-icons icons'>
          <div 
            className='todo-box-icon'
            onClick={() => updateTodo({...todo, done: todo.done ? false : true})}
          >
            {todo.done ? '\u274c' : '\u2705'}
          </div>
          <div 
            className='todo-box-icon'
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? '\u2500' : '\u2630'}
          </div>
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
        <div className="todo-box-icons icons">
          <div 
            className='todo-box-icon'
            onClick={() => setWarning(true)}
          >
            {'\u2421'}
          </div>
          <div
            className='todo-box-icon'
            onClick={() => editTodo(todo)}
          >
            {'\u270F'}
          </div>
        </div>
      </div>
      {showSteps ? 
        <ShowSteps steps={todo.steps} todoId={todo.id} />
        : null}
    </div>
  )
};

const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  editTodo,
};

export default connect(null, mapDispatchToProps)(ShowTodo);