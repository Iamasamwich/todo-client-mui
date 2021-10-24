import { useState } from 'react';
import { connect } from 'react-redux';
import { addStep, AddStepBody } from '../actions/step';
import ShowStep from './ShowStep';

interface Props {
  steps: {
    step: string;
    id: number;
    done: boolean;
    todoId: number;
  }[];
  todoId: number;
  addStep: (body: AddStepBody) => void;
};

const ShowSteps = ({steps, todoId, addStep} : Props) => {

  const [step, setStep] = useState('');

  const handleAddStepClick = () => {
    if (!step) {
      
      return;
    } else {
      const body = {
        step,
        todoId,
        done: false,
      };
      addStep(body);
      setStep('');
      return;
    };
  };

  return (
    <div className='todo-box-steps'>
      {steps.map(step => {
        return <ShowStep step={step} key={step.id} />
      })}
      <div className='step-input'>
        <input
          value={step}
          onChange={e => setStep(e.target.value)}
        />
        <button
          onClick={handleAddStepClick}
        >Add Step</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addStep
};

export default connect(null, mapDispatchToProps)(ShowSteps);