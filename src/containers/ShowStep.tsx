import React from 'react';
import { connect } from 'react-redux';
import {updateStep, deleteStep} from '../actions/step';
import { Istep, IupdateStepBody } from '../interfaces';

interface Props {
  step: Istep;
  updateStep: (details : IupdateStepBody) => void;
  deleteStep: (stepId : number, todoId: number) => void;
};

const ShowStep = ({step, updateStep, deleteStep} : Props) => {

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
        className={step.done ? 'greenText step-icons icons' : 'step-icons icons'}
        onClick={() => handleStepDoneClick()}
      >
        {step.done ? '\u2611' : '\u2611'}
      </div>
      <div className={step.done ? 'todo-step greyText' : 'todo-step'} >
        {'\u00b7'} {step.step}
      </div>
      <div
        className="step-icons icons"
        onClick={() => deleteStep(step.id, step.todoId)}
      >
        {'\u2421'}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateStep,
  deleteStep
}

export default connect(null, mapDispatchToProps)(ShowStep);