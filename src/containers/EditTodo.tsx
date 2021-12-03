import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import React, { useEffect, useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { connect } from 'react-redux';
import { updateTodo } from '../actions/todo';
import { changePage } from '../actions/page'
import { Itodo } from '../interfaces';
import styles from '../styles/styles';

interface State {
  todoToUpdate: Itodo;
};

interface Props extends State {
  updateTodo: (todo : Itodo) => void;
  changePage: (page: string) => void;
};

const UpdateTodo = ({todoToUpdate, updateTodo, changePage} : Props) => {

  const convertDate = (unformattedDate : Date) => {
    return unformattedDate.getFullYear() + '-' 
      + (unformattedDate.getMonth() + 1) + '-' 
      + unformattedDate.getDate();
  };

  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState <Date> (new Date());

  const [todoError, setTodoError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    if (todoToUpdate === null) {
      return;
    } else {
      setTodo(todoToUpdate.todo);
      setDueDate(new Date(todoToUpdate.dueDate));
    };
  }, [todoToUpdate]);

  useEffect(() => {
    if (!todo) {
      setTodoError(true);
    } else {
      setTodoError(false);
    };
  }, [todo]);

  useEffect(() => {
    if (!todoError) {
      setAnyError(false);
    } else {
      setAnyError(true);
    };
  }, [todoError]);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const reTodo = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setTodo(reTodo);
  };

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError || !dueDate) {
      return;
    } else {
      const date = convertDate(dueDate);
      updateTodo({...todoToUpdate, todo, dueDate: date});
    }
  }

  return (
    <Box sx={styles.main}>
      <Typography variant='h2'
        align='center'
      >
        Update A Todo
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <TextField
          sx={{
            marginBottom: 2
          }}
          variant='standard'
          label='Enter Todo Text'
          value={todo}
          onChange={handleTodoChange}
          error={todoError}
          autoFocus={true}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Due Date'
            value={dueDate}
            openTo='day'
            inputFormat='dd/MM/yyyy'
            onChange={newValue => setDueDate(newValue as Date)}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Stack
          pt={2}
          spacing={2}
        >
          {anyError ? null :
            <Button
              variant='contained'
              type='submit'
              color='success'
            >
              Update Todo
            </Button>
          }
          <Button
            variant='contained'
            color='warning'
            onClick={() => changePage('home')}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({todoToUpdate} : State) => {
  return {
    todoToUpdate
  };
};

const mapDispatchToProps = {
  changePage,
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTodo);