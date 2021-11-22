import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewPost from '../NewPost/';  
import NavMenu from './NavMenu';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai"; 
import { BsSearch } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";  
import './Navigation.css';
      

function Navigation({ isLoaded }){  

  const sessionUser = useSelector(state => state.session.user);  

  return (   
    <nav className='Navmain'>  
        <div className='Navcontainer'>
            <NavLink exact to='/'>Ziba</NavLink> 
            {isLoaded && ( 
                <div className='Navbuttons'>  
                    <button  className='Navprofile' >  
                      <BsSearch/> 
                    </button>  
                    <NavLink  className='Navprofile' exact to={`/Home`}>  
                      <AiOutlineHome/> 
                    </NavLink>  
                    <NavLink  className='Navprofile' exact to={`/Messages`}>  
                      <BiMessage/> 
                    </NavLink>  
                    <button  className='Navprofile'>  
                    <NewPost/> 
                    </button>  
                    <NavLink  className='Navprofile' exact to={`/Discover`}>  
                      <AiOutlineCompass/> 
                    </NavLink>    
                    <button  className='Navprofile'>  
                    <AiOutlineNotification/> 
                    </button >   
                    <NavMenu user={sessionUser} /> 
                </div> 
            )}
        </div>
    </nav>
);
}


export default Navigation;