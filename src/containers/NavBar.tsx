import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions/page';
import { logout } from '../actions/user';

interface State {
  login: boolean;
  page: string;
};

interface Props extends State {
  logout: () => void;
  changePage: (page: string) => void;
}

const NavBar = ({login, page, logout, changePage} : Props) => {

  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClickOutside = (e : any) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      } else {
        setMenuOpen(false);
      };
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (item : string) => {
    setMenuOpen(false)
    switch (item) {
      case 'logout':
        return logout();
      default:
        return;
    };
  };

  const ShowMenu = () => {
    return (
      <div 
        className={`nav-menu ${menuOpen ? 'menu-open' : ''}`}
      >
        {login ? 
        <>
          <div 
            className='menu-item'
            onClick={() => handleMenuClick('logout')}
          >
            Log Out
          </div>
          <div
            className='menu-item'
            onClick={() => changePage('editUser')}
          >
            Profile
          </div>
        </>
        : null}
      </div>
    );
  };
  
  return (
    <div 
      ref={ref}
      className='navbar'
    >
      {login ? 
        <div 
          className='nav-icon'
          onClick={() => setMenuOpen(!menuOpen)}
        >{'\u2630'}</div>
      : null}
      {page !== 'home' ?
        <div 
          className='nav-icon'
          onClick={() => changePage('home')}
        >
          {'\u2302'}
        </div>  
      : null}
      <ShowMenu />
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
  logout,
  changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);