import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ReplayIcon from '@mui/icons-material/Replay';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addStep, updateStep, deleteStep } from '../actions/step';
import { IaddStepBody, IupdateStepBody, Istep } from '../interfaces';

interface Props {
  steps: Istep[];
  todoId: number;
  addStep: (body: IaddStepBody) => void;
  updateStep: (details : IupdateStepBody) => void;
  deleteStep: (stepId : number, todoId: number) => void;
};

const ShowSteps = ({steps, todoId, addStep, updateStep, deleteStep} : Props) => {

  const [step, setStep] = useState('');

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (!step) {
      return;
    } else {
      addStep({todoId, step, done: false});
      setStep('');
      return;
    }
  };

  const handleStepChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setStep(text);
  };

  return (
    <Grid container direction='column'>
      {
        steps.map(step => (
          <Grid container key={step.id}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={1}>
                  {step.done ? 
                    <ReplayIcon 
                      onClick={() => updateStep({stepId: step.id, todoId: step.todoId, body: {step: step.step, done: !step.done}})}
                    /> 
                    : 
                    <DoneIcon
                      color='success' 
                      onClick={() => updateStep({stepId: step.id, todoId: step.todoId, body: {step: step.step, done: !step.done}})}
                    />
                  }
                </Grid>
                <Grid item xs={10} pl={2} sx={{overflow: 'hidden'}}>
                  <Typography 
                    variant='body1' 
                  >
                    {step.step}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <DeleteForeverOutlinedIcon 
                    color='warning'
                    onClick={() => deleteStep(step.id, step.todoId)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))
      }
        <Grid 
          container 
          component='form'
          onSubmit={handleSubmit}
          spacing={1}
        >
          <Grid item xs={12}>
            <TextField 
              variant='standard' 
              label='Enter new step...' 
              value={step}
              onChange={handleStepChange}
              sx={{
                marginRight: '10px',
                width: '100%'
              }}
              autoFocus={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              fullWidth
              variant='contained' 
              color='success'
              type='submit'
            >
              Add Step
            </Button>
          </Grid>
        </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  addStep,
  updateStep,
  deleteStep
};

export default connect(null, mapDispatchToProps)(ShowSteps);
