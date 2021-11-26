import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuIcon from '@mui/icons-material/Menu';
import MinimizeIcon from '@mui/icons-material/Minimize';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo, editTodo } from '../actions/todo';
import { Itodo } from '../interfaces';
import ShowSteps from './ShowSteps';

import styles from '../styles/styles';

interface Props {
  todo: Itodo;
  updateTodo: (todo: Itodo) => void;
  deleteTodo: (todoId: number) => void;
  editTodo: (todoToEdit: Itodo) => void;
};

const ShowTodo = ({todo, updateTodo, deleteTodo, editTodo} : Props) => {

  const [showSteps, setShowSteps] = useState(false)
  const [warning, setWarning] = useState(false);

  const ShowDueDate = () => {
    const d = new Date();
    const todaysDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const now = Math.floor(new Date(todaysDate).getTime() / (1000 * 3600 * 24));
    const due = Math.floor(new Date(todo.dueDate).getTime() / (1000 * 3600 * 24));

    const daysTilDue = due - now;
    
    let text : string;
    if (daysTilDue < 0) {
      text = `${Math.abs(daysTilDue)} days overdue!`
    } else if (daysTilDue === 0) {
      text = 'Due today!';
    } else {
      text = `${daysTilDue} days until due.`
    };
    return <Typography variant='h5'>{text}</Typography>
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
    return <Typography variant="h5">{text}</Typography>
  };

  const handleTodoDone = (todo : Itodo) => {
    updateTodo({...todo, done: todo.done ? false : true})
  };

  return (
    <>
      <Grid container>

        {/* left icons */}
        <Grid item md={1}> 
          <Stack direction='column' alignItems='center' spacing={2} padding={2}>
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
          </Stack>
        </Grid>

        {/* center column */}
        <Grid 
          item
          md={10}
        >
          <Grid 
            container
            direction='column'
          >
            {/* todo container */}
            <Grid container padding={1}>
              <Grid 
                item 
                md={8} 
                sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: 1
                }}>
                <Typography variant='h4'>
                  {todo.todo}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Grid container direction='column'>
                  <Grid 
                    item
                    sx={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end', 
                      paddingRight: 1, 
                    }}>
                    {ShowStepsCount()}
                  </Grid>
                  <Grid 
                    item
                    sx={{
                      display: 'flex',
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                      paddingRight: 1
                    }}
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
        <Grid item md={1}>
          <Stack direction='column' alignItems='center' spacing={2} padding={2}>
            <EditOutlinedIcon fontSize='large' />
            <DeleteForeverOutlinedIcon fontSize='large' color='error' />
          </Stack>
        </Grid>
      </Grid>
      <hr />
    </>




  )
};

const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  editTodo,
};

export default connect(null, mapDispatchToProps)(ShowTodo);

// div className="todo-box">
//       {warning ? 
//         <div className='delete-todo-warning'>
//           <div className='warning-box'>

//             <p>You are about to delete a todo!</p>
//             <p>This action is not reversable!</p>
//             <p>To mark as done click the green tick to the left of the todo.</p>
//             <div className='form-buttons'>

//               <button
//                 className='green'
//                 onClick={() => deleteTodo(todo.id)}
//                 >DELETE IT!</button>
//               <button
//                 className='red'
//                 onClick={() => setWarning(false)}
//                 >Cancel</button>
//             </div>

//             </div>
//           </div>
//       : null}
//       <div className="todo-box-todo">

//         <div className='todo-box-icons icons'>
//           <div 
//             className='todo-box-icon'
//             onClick={() => updateTodo({...todo, done: todo.done ? false : true})}
//           >
//             {todo.done ? '\u274c' : '\u2705'}
//           </div>
//           <div 
//             className='todo-box-icon'
//             onClick={() => setShowSteps(!showSteps)}
//           >
//             {showSteps ? '\u2500' : '\u2630'}
//           </div>
//         </div>
//         <div className="todo-box-text">
//           <div className='todo-box-top'>
//             <h2>{todo.todo}</h2>
//           </div>
//           <div className='todo-box-bottom'>
//             <ShowDueDate />
//             <ShowStepsCount />
//           </div>
//         </div>
//         <div className="todo-box-icons icons">
//           <div 
//             className='todo-box-icon'
//             onClick={() => setWarning(true)}
//           >
//             {'\u2421'}
//           </div>
//           <div
//             className='todo-box-icon'
//             onClick={() => editTodo(todo)}
//           >
//             {'\u270F'}
//           </div>
//         </div>
//       </div>
//       {showSteps ? 
//         <ShowSteps steps={todo.steps} todoId={todo.id} />
//         : null}
//     </div> */