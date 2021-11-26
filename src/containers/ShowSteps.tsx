import {Grid, Typography, TextField, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addStep } from '../actions/step';
import { IaddStepBody, Istep } from '../interfaces';
import ShowStep from './ShowStep';

import styles from '../styles/styles';

interface Props {
  steps: Istep[];
  todoId: number;
  addStep: (body: IaddStepBody) => void;
};

const ShowSteps = ({steps, todoId, addStep} : Props) => {

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
            <Grid container>
              <Grid item md={1} />
              <Grid item md={10} sx={{borderTop: 1}}>
                <Grid container>
                  <Grid item md={1} sx={styles.centered}>
                    <DoneIcon />
                  </Grid>
                  <Grid item md={10}>
                    <Typography variant='body1' fontSize='1.8em' marginLeft={6}>
                      <span>{'\u00B7'} </span>{step.step}
                    </Typography>
                  </Grid>
                  <Grid item md={1} sx={styles.centered}>
                    <DeleteForeverOutlinedIcon 
                      color='warning'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
          <Grid container component='form'
            onSubmit={handleSubmit}
          >
            <Grid item md={2} />
            <Grid item md={6}>
              <TextField 
                variant='standard' 
                label='Enter new step...' 
                value={step}
                onChange={handleStepChange}
                sx={{width: '100%'}}
              />
            </Grid>
            <Grid item md={2} sx={styles.centered}>
              <Button 
                variant='contained' 
                color='success'
                type='submit'
                sx={{flexGrow: 1}}
              >
                Add Step
              </Button>
            </Grid>
          </Grid>
      </Grid>
  );
};

const mapDispatchToProps = {
  addStep
};

export default connect(null, mapDispatchToProps)(ShowSteps);

  // {/* <div className='todo-box-steps'>
  //     {steps.map(step => {
  //       return <ShowStep step={step} key={step.id} />
  //     })}
  //     <div className='step-input'>
  //       <input
  //         value={step}
  //         onChange={e => setStep(e.target.value)}
  //         onKeyDown={e => e.code === "Enter" ? handleAddStepClick() : null}
  //       />
  //       <button
  //         onClick={handleAddStepClick}
  //         className='green'
  //       >Add Step</button>
  //     </div>
  //   </div> */}
