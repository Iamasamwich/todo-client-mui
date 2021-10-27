import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/user';

interface State {
  login: boolean;
  page: string;
};

interface Props extends State {
  logout: () => void;
}

const NavBar = ({login, page, logout} : Props) => {

  const [menuOpen, setMenuOpen] = useState(true)
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClickOutside = (e : any) => {
      console.log(ref.current.className);
      
      if (ref.current && ref.current.contains(e.target) && ref.current.className === 'nav-menu') {
        return;
      } 
      setMenuOpen(false);
    };

  
  document.body.addEventListener('click', handleClickOutside);

  return () => document.body.removeEventListener('click', handleClickOutside);
}, []);


  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  const ShowMenu = () => {
    return (
      <div 
        ref={ref}
        className='nav-menu'
        onBlur={() => setMenuOpen(false)}
      >
        {login ? 
        <div 
        className='menu-item'
        onClick={handleLogout}
        >
          Log Out
        </div>
        : null}
        <div className='menu-item'>Andother one</div>
      </div>
    );
  };
  
  return (
    <div className='navbar'>
      <div 
        className='nav-icon'
        onClick={() => setMenuOpen(!menuOpen)}
      >{'\u2630'}</div>
      {page !== 'home' ?
        <div className='nav-icon'>{'\u2302'}</div>  
      : null}
      {menuOpen ? 
        <ShowMenu />
      : null}
    </div>
  );
};

const mapStateToProps = ({login, page} : State) => {
  return {
    login,
    page
  };
};

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);