import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/user';
import { changePage } from '../actions/page';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface State {
  login: boolean;
  page: string;
};

interface Props extends State {
  changePage: (page : string) => void;
  logout: () => void;
};

const NavBar = ({page, login, changePage, logout} : Props) => {

  const [showMenu, setShowMenu] = useState <boolean> (false);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClickOutside = (e : any) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      } else {
        setShowMenu(false);
      };
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <AppBar
      ref={ref}
      position='fixed'
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Typography
          variant='h6' sx={{flexGrow: 1}}
        >
          {login ? 
            'Welcome back!'
            : 
            'Log in or create an account'
          }
        </Typography>
        {page !== 'home' && 
          <IconButton 
            size='large'
            color='inherit'
            onClick={() => changePage('home')}
          >
            <HomeOutlinedIcon />
          </IconButton>
        }
        {login &&
          <IconButton 
            size='large'
            color='inherit'
            onClick={() => setShowMenu(!showMenu)}
            >
            <MenuIcon />
          </IconButton>
        }
      </Toolbar>
      {(login && showMenu) && 
        <List
          sx={{
            border: '1px solid black',
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            right: '30px',
            top: '80px',
            color: 'black'
          }}
        >
          <ListItemButton
            onClick={logout}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>
              Logout
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => changePage('editUser')}
          >
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              Profile
            </ListItemText>
          </ListItemButton>
        </List>
      }
    </AppBar>
  );
};

const mapStateToProps = ({page, login} : State) => {
  return {
    page, login
  };
};

const mapDispatchToProps = {
  changePage,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);