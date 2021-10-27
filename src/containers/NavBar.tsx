import React, { useState } from 'react';
import { connect } from 'react-redux';

interface State {
  login: boolean;
  page: string;
};

const NavBar = ({login, page} : State) => {

  console.log(page);

  const [menuOpen, setMenuOpen] = useState(false)

  console.log("menuOpen", menuOpen);
  
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
        <div className='nav-menu' />
      : null}


    </div>
  )


};

const mapStateToProps = ({login, page} : State) => {
  return {
    login,
    page
  };
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);