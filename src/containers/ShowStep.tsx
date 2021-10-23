import React from 'react';

interface Props {
  step: {
    id: number;
    todoId: number;
    step: string;
    done: boolean;
  };
};

const ShowStep = ({step} : Props) => {
  console.log(step);
  
  return (
    <div className='step'>
      <div className='step-icons icons'>
        {step.done ? '\u274c' : '\u2705'}
      </div>
      <div className="todo-step">
        {'\u00b7'} {step.step}
      </div>
    </div>
  );
};

export default ShowStep;