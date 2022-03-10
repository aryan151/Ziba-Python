import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";    
import {logout} from '../../../store/session';
import {useDetectOutsideClick} from './NavBarClick'  
import './NavMenu.css'  
import profile from './profile.svg'
import settings from './settings.svg' 
import logouts from './logout.svg' 
import LogoutButton from '../../auth/LogoutButton'
 
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
              <img src={profile} alt="Profile Icon" draggable="false" />
              Profile
            </a>
          </li>

          <li>
            <NavLink className='avatarReroute' to={`/users/${user.id}/edit_profile`}>
              <img src={settings} alt="Settings Icon" draggable="false" /> 
              Settings
            </NavLink>
          </li>  
          <li className='borderTop' >  
          <LogoutButton/> 
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default NavMenu;
