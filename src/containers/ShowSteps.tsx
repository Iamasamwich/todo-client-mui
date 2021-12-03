import {Grid, Typography, TextField, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ReplayIcon from '@mui/icons-material/Replay';


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addStep, updateStep, deleteStep } from '../actions/step';
import { IaddStepBody, IupdateStepBody, Istep } from '../interfaces';

import styles from '../styles/styles';

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
            <Grid item xs={0} md={1} />
            <Grid item xs={12} md={10} sx={{borderTop: 1}}>
              <Grid container>
                <Grid item xs={1} sx={styles.centered}>
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
                <Grid item xs={10} sx={{overflow: 'hidden'}}>
                  <Typography 
                    variant='body1' 
                    marginLeft={6}
                    sx={{
                      marginLeft: '40px',
                      '@media (max-width: 767px)': {
                        marginLeft: '16px'
                      }
                    }}
                  >
                    {step.step}
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={styles.centered}>
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
        <Grid container component='form'
          onSubmit={handleSubmit}
          sx={{alignItems: 'end'}}
        >
          <Grid item xs={0} md={2} />
          <Grid item xs={9} md={6} >
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
          <Grid item xs={3} md={2} sx={styles.centered}>
            <Button 
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
