import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todo';
import { changePage } from '../actions/page'
import { IaddTodoBody } from '../interfaces';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface Props {
  addTodo: (body: IaddTodoBody) => Promise<void>;
  changePage: (page: string) => void;
};

const AddTodo = ({addTodo, changePage} : Props) => {

  const convertDate = (unformattedDate : Date) => {
    return unformattedDate.getFullYear() + '-' 
      + (unformattedDate.getMonth() + 1) + '-' 
      + unformattedDate.getDate();
  };

  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState <Date> (new Date());

  const [todoError, setTodoError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    if (!todo) {
      setTodoError(true);
    } else {
      setTodoError(false);
    }
  }, [todo]);

  useEffect(() => {
    if (dueDate && typeof(dueDate.getMonth) === 'function') {
      setDueDateError(false);
    } else {
      setDueDateError(true);
    }
  }, [dueDate]);

  useEffect(() => {
    if (!todoError && !dueDateError) {
      setAnyError(false);
    } else {
      setAnyError(true);
    };
  }, [todoError, dueDateError]);

  const handleTodoChange = (e: any) =>{
    const reTodo = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setTodo(reTodo);
  };

  const handleDateChange = (date : Date) => {
    setDueDate(date);
  };

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (anyError) {
      return;
    } else {
      const date = convertDate(dueDate);
      addTodo({todo, dueDate: date});
    };
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography
        variant='h2'
        align='center'
      >
        Add A Todo
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          width: '50%'
        }}
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
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Due Date'
            value={dueDate}
            openTo='day'
            inputFormat="dd/MM/yyyy"
            onChange={newValue => handleDateChange(newValue as Date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Stack
          pt={2}
          spacing={2}
        >
          {!anyError ?
            <Button
              variant='contained'
              type='submit'
              color='success'
            >
              Add Todo
            </Button>
          : null }
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

const mapDispatchToProps = {
  addTodo,
  changePage
};

export default connect(null, mapDispatchToProps)(AddTodo);