import React from 'react';
import { connect } from 'react-redux';
import {updateStep} from '../actions/step';

interface Props {
  step: {
    id: number;
    todoId: number;
    step: string;
    done: boolean;
  };
  updateStep: (stepId : number, todoId: number, body : {step: string; done: boolean}) => void;
};

const ShowStep = ({step, updateStep} : Props) => {

  const handleStepDoneClick = () => {
    const body = {
      step: step.step,
      done: step.done ? false : true,
    };
    updateStep(step.id, step.todoId, body);
    return;
  };

  return (
    <div className='step'>
      <div 
        className='step-icons icons'
        onClick={() => handleStepDoneClick()}
      >
        {step.done ? '\u274c' : '\u2705'}
      </div>
      <div className="todo-step">
        {'\u00b7'} {step.step}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateStep
}

export default connect(null, mapDispatchToProps)(ShowStep);