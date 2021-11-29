import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";    
import {logout} from '../../../store/session';
import {useDetectOutsideClick} from './NavBarClick'  
import './NavMenu.css'  

function NavMenu({ user }) { 
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const dispatch = useDispatch()
  const logoutUser = async (e) => {
    await dispatch(logout());
  }   

  return (
    <> 
      
      <div className="dropDownContainer">
      <div  onClick={onClick}>
      <IoMdPerson/> 
      </div>

      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          <li> 
            <a className="avatarReroute" href={`/users/${user.id}`}>
            <IoMdPerson/> 
              Profile
            </a>
          </li>

          <li>
            <NavLink className='avatarReroute' to={`/users/2`}>
            <IoMdPerson/> 
              Settings
            </NavLink>
          </li>
          <li className='borderTop' onClick={logoutUser}>
          <IoMdPerson/> 
          LogOut
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default NavMenu;
