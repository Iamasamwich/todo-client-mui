import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions/todo';
import { changePage } from '../actions/page';
import ShowTodo from './ShowTodo';
import { Itodo } from '../interfaces';

interface State {
  todos: Itodo[],
  todosFetched: boolean;
};

interface Props extends State {
  getTodos: () => void;
  changePage: (page : string) => void;
};

const ShowTodos = ({todos, todosFetched, getTodos, changePage} : Props) => {

  const [allOrActive, setAllOrActive] = useState <'all' | 'active'>('active');

  useEffect(() => {
    if (!todosFetched) {
      getTodos();
    };
  }, [getTodos, todosFetched]);

  const selectedTodos = () => {

    const sortedTodos = todos.sort((a, b) => {
      return a.dueDate === b.dueDate ? 0 : a.dueDate < b.dueDate ? -1 : 1;
    });

    if (allOrActive === 'active') {
      return sortedTodos.filter(todo => {
        return !todo.done ? todo : null;
      });
    } else {
      return sortedTodos;
    };
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
    >
      <Grid item xs={12}>
        <Typography
          variant='h2'
          align='center'
        >
          Your Todos
        </Typography>
      </Grid>
      <Grid
        container
        spacing={1}
        padding={1}
        justifyContent='center'
      >
        <Grid 
          item 
          xs={12}
          sm={6}  
          md={4}
          lg={3}
        >
          <Button
            fullWidth
            variant='contained'
            onClick={() => changePage('addTodo')}
            color="success"
            startIcon={<AddIcon />}
          >
            Add A Todo
          </Button>
        </Grid>
        <Grid 
          item 
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <Button
            fullWidth
            variant='contained'
            onClick={() => setAllOrActive(allOrActive === 'active' ? 'all':'active')}
            startIcon={<ReplayIcon />}
          >
            {allOrActive === 'all' ? 'Show Active Todos' : 'Show All Todos'}
          </Button>
        </Grid>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={0} md={1}></Grid>
        <Grid item xs={12} md={10}>
          {selectedTodos().length !== 0 ? null :
            <Grid
              container
              direction='column'
              alignItems='center'
              p={1}
              spacing={2}
            >
              <Grid item>
                <Typography variant='h4'>
                  Whoops, it looks like there's nothing here
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h4'>
                  Click "ADD A TODO" to add a new todo
                </Typography>
              </Grid>
              {allOrActive === 'all' ? null :
                <>
                  <Grid item>
                    <Typography align='center' variant='h6'>...or...</Typography>
                  </Grid>
                  <Grid item>
                    <Typography align='center' variant='h4'>
                      Click "SHOW ALL TODOS" to show the ones you have marked as done.
                    </Typography>
                  </Grid>
                </>
              }
            </Grid>
          }
          {selectedTodos().map(todo => <ShowTodo todo={todo} key={todo.id} />)}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({todos, todosFetched} : State) => {
  return {
    todos,
    todosFetched,
  };
};

const mapDispatchToProps = {
  getTodos,
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodos);