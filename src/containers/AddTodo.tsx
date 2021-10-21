import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const AddTodo = () => {

  const [todo, setTodo] = useState('');

  const [todoError, setTodoError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    if (!todo) {
      setTodoError(true);
    } else {
      setTodoError(false);
    }
  }, [todo]);

  useEffect(() => {
    if (!todoError) {
      setAnyError(false);
    } else {
      setAnyError(true);
    };
  }, [todoError]);

  const ShowButtons = () => {
    return (
      <div className="form-buttons">
        <button className="green">
          Add It!
        </button>
        <button className="red">
          Cancel
        </button>
      </div>
    );
  };

  const handleTodoChange = (e: any) =>{
    const reTodo = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setTodo(reTodo);
  };

  return (
    <>
      <Logo />
      <div className="minusLogo">
        <h1>Add A Todo</h1>
        <div className="form-box">
          <label>Todo:</label>
          <input
            className={todoError ? 'error' : ''}
            value={todo}
            onChange={handleTodoChange}
          />
          <label>Due Date:</label>
          <input />
          <ShowButtons />
        </div>


      </div>
    </>
  )

};

export default AddTodo;