import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";    
import * as sessionActions from '../../../store/session';
import './NavMenu.css'  

function NavMenu({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };
  
    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  
  const logout = (e) => {  
    e.preventDefault();  
    dispatch(sessionActions.logout());
    history.push('/')        
  };
      
  return (
    <>  
      <button onClick={openMenu} className='profile'>  
        <IoMdPerson/> 
      </button>
      {showMenu && (    
        <div className='dropdown'>
          <NavLink className='link' exact to={`/users/${user.id}`}>Profile</NavLink>
          <NavLink className='link' exact to={`/users/${user.id}`}>Analytics</NavLink>
          <NavLink className='link' exact to={`/users/${user.id}`}>Settings</NavLink>
          <button className='link button' onClick={logout}>Log Out</button>    
        </div>
      )}
    </>
  );
}

export default NavMenu;
