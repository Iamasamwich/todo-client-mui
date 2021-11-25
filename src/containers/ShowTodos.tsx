import { Box, Typography, Stack, Button } from '@mui/material';

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant='h2'
        align='center'
      >
        Your Todos
      </Typography>
      <Stack
        direction='row'
        spacing={2}
      >
        <Button
          variant='contained'
          onClick={() => changePage('addTodo')}
        >
          Add A Todo
        </Button>
        <Button
          variant='contained'
          onClick={() => setAllOrActive(allOrActive === 'active' ? 'all':'active')}
        >
          {allOrActive === 'all' ? 'Show Active Todos' : 'Show All Todos'}
        </Button>
      </Stack>
      <Box>
        {selectedTodos().map(todo => <ShowTodo todo={todo} key={todo.id} />)}
      </Box>
    </Box>
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