import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const reTodo = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setTodo(reTodo);
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
    <Grid 
      container
    >
      <Grid item xs={0} sm={2} md={3} />
      <Grid item xs={12} sm={8} md={6}>
        <Grid container direction='column'>
          <Grid item>
            <Typography
              variant='h2'
              align='center'
              >
              Add A Todo
            </Typography>
          </Grid>
          <Grid item>
            <Grid 
              container
              direction='column'
              component='form'
              spacing={1}
              padding={1}
              onSubmit={handleSubmit}
            >
              <Grid item>
                <TextField
                  fullWidth
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
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Due Date'
                    value={dueDate}
                    openTo='day'
                    inputFormat="dd/MM/yyyy"
                    onChange={newValue => setDueDate(newValue as Date)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={0} sm={2} md={3} />
                  <Grid item xs={12} sm={8} md={6}>
                    <Grid 
                      container 
                      direction='column'
                      padding={2}
                      spacing={2}
                    >
                      {!anyError ?
                        <Grid item>
                          <Button
                            fullWidth
                            variant='contained'
                            type='submit'
                            color='success'
                          >
                            Add Todo
                          </Button>
                        </Grid>
                      : null }
                      <Grid item>
                        <Button
                          fullWidth
                          variant='contained'
                          color='warning'
                          onClick={() => changePage('home')}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  addTodo,
  changePage
};

export default connect(null, mapDispatchToProps)(AddTodo);