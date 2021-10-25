import React from 'react';
import { connect } from 'react-redux';
import {updateStep} from '../actions/step';
import { Istep, IupdateStepBody } from '../interfaces';

interface Props {
  step: Istep;
  updateStep: (details : IupdateStepBody) => void;
};

const ShowStep = ({step, updateStep} : Props) => {

  const handleStepDoneClick = () => {
    const body = {
      step: step.step,
      done: step.done ? false : true,
    };
    updateStep({stepId: step.id, todoId: step.todoId, body});
    return;
  };

  return (
    <div className='step'>
      <div 
        className={step.done ? 'greenIcon step-icons icons' : 'step-icons icons'}
        onClick={() => handleStepDoneClick()}
      >
        {step.done ? '\u2611' : '\u2611'}
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