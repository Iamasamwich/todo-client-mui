import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuIcon from '@mui/icons-material/Menu';
import MinimizeIcon from '@mui/icons-material/Minimize';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo, editTodo, resetTodo } from '../actions/todo';
import { Itodo } from '../interfaces';
import ShowSteps from './ShowSteps';

import styles from '../styles/styles';

interface Props {
  todo: Itodo;
  updateTodo: (todo: Itodo) => void;
  deleteTodo: (todoId: number) => void;
  editTodo: (todoToEdit: Itodo) => void;
  resetTodo: (todoId : string) => void;
};

const ShowTodo = ({todo, updateTodo, deleteTodo, editTodo, resetTodo} : Props) => {
  const [showSteps, setShowSteps] = useState(false)
  const [warning, setWarning] = useState(false);

  const ShowDueDate = () => {
    const d = new Date();
    const todaysDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const now = Math.floor(new Date(`${todaysDate} 00:00`).getTime() / (1000 * 3600 * 24));
    const due = Math.floor(new Date(`${todo.dueDate} 00:00`).getTime() / (1000 * 3600 * 24));
    const daysTilDue = due - now;

    let text : string;
    if (daysTilDue < 0) {
      text = `${Math.abs(daysTilDue)} days overdue!`
    } else if (daysTilDue === 0) {
      text = 'Due today!';
    } else {
      text = `${daysTilDue} days until due.`
    };
    return <Typography variant='h5' sx={{textAlign: 'center'}}>{text}</Typography>
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
    return <Typography variant="h5" sx={{textAlign: 'center'}}>{text}</Typography>
  };

  const handleTodoDone = (todo : Itodo) => {
    updateTodo({...todo, done: todo.done ? false : true})
  };

  return (
    <>
      <Modal
        open={warning}
        onClose={() => setWarning(false)}
      >
        <Box
          sx={styles.popup}
        >
          <Typography 
            align='center' 
            color='error' 
            variant='h3'
            sx={styles.textFlash}
          >
            Warning!
          </Typography>
          <Typography align='center' color='error' variant='h5'>
            This will permanantly delete the Todo!
          </Typography>
          <Typography align='center' variant='h5'>
            Consider clicking the green tick to mark it as done instead...
          </Typography>
          <Stack direction='row' spacing={2} padding={2} justifyContent='center'>
            <Button
              color='error'
              variant='contained'
              onClick={() => deleteTodo(todo.id)}
            >
              Delete it!
            </Button>
            <Button 
              color='success'
              variant='contained'
              onClick={() => setWarning(false)}  
            >
              Keep it!
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Grid container>
        {/* left icons */}
        <Grid item xs={1}> 
          <Grid 
            container 
            direction='column' 
            alignItems='center'
          >
            <Grid item>
              {todo.done ?
                <ReplayIcon 
                fontSize='large' 
                onClick={() => handleTodoDone(todo)}
                />
                :
                <DoneIcon 
                fontSize='large' 
                color='success' 
                onClick={() => handleTodoDone(todo)}
                />
              }
            </Grid>
            <Grid item>
              {showSteps ? 
                <MinimizeIcon 
                fontSize='large' 
                onClick={() => setShowSteps(!showSteps)}
                />
                : 
                <MenuIcon 
                fontSize='large' 
                onClick={() => setShowSteps(!showSteps)}
                />
              }
            </Grid>
          </Grid>
        </Grid>

        {/* center column */}
        <Grid item xs={10} pl={1} pr={1}>
          <Grid container direction='column'>
            <Grid container padding={1}>
              <Grid 
                item 
                xs={12} 
                sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: 1,
                  overflow: 'hidden',
                }}>
                <Typography variant='h4'>
                  {todo.todo}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid 
                    item
                    xs={6}
                  >
                    {ShowStepsCount()}
                  </Grid>
                  <Grid 
                    item
                    xs={6}
                  >
                    {ShowDueDate()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {!showSteps ? null :
              <ShowSteps steps={todo.steps} todoId={todo.id} />
            }
          </Grid>
        </Grid>

        {/* right icons */}
        <Grid item xs={1}>
          <Grid 
            container 
            direction='column' 
            alignItems='center' 
          >
            <Grid item>
              <EditOutlinedIcon 
                fontSize='large' 
                onClick={() => editTodo(todo)}
              />
            </Grid>
            <Grid item>
              <RotateLeftIcon 
                onClick={() => resetTodo(String(todo.id))}
              />
            </Grid>
            <Grid item>
              <DeleteForeverOutlinedIcon 
                fontSize='large' 
                color='error' 
                onClick={() => setWarning(true)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
    </>
  );
};

const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  editTodo,
  resetTodo
};

export default connect(null, mapDispatchToProps)(ShowTodo);
