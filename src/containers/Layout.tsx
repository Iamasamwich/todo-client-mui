import React from 'react';

import { connect } from 'react-redux';
import { changePage } from '../actions/page';
import { logout } from '../actions/user';

import { Container, Toolbar, Typography, Box } from '@mui/material';
import NavBar from './NavBar';

import Icon from '../assets/icon.png';

import styles from '../styles/styles';

interface State {
  login: boolean;
  page: string;
};

interface Props extends State {
  children: React.ReactNode;
  logout: () => void;
  changePage: (page: string) => void;
};

const Layout = ({children, login, page, logout, changePage} : Props) => {

  return (
    <Container sx={styles.root}>
      <NavBar />
      <Toolbar />
      <Box sx={styles.main}>
        <Box sx={styles.icon}>
          <img style={{objectFit: 'contain', height: '100%', width: '100%'}} src={Icon} alt="icon" />
        </Box>
      </Box>
      <Typography 
        variant='h1'
        align='center'
        pb={3}
      >
        Things To Do
      </Typography>
      <hr />
      {children}
    </Container>
  );
};

const mapStateToProps = ({login, page} : State) => {
  return {
    login, page
  };
};

const mapDispatchToProps = {
  logout,
  changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);