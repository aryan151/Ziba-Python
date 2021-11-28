import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
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

  const history = useHistory();  
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
                    <button  className='Navprofile' onClick={() => history.push('/Home')} >  
                      <AiOutlineHome/> 
                    </button>  
                    <button  className='Navprofile' onClick={() => history.push('/Messages')}>  
                      <BiMessage/> 
                    </button>  
                    <button  className='Navprofile'>  
                    <NewPost/> 
                    </button>  
                    <button  className='Navprofile' onClick={() => history.push('/Discover')}>  
                      <AiOutlineCompass/> 
                    </button>    
                    <button  className='Navprofile'>  
                    <AiOutlineNotification/> 
                    </button >   
                    <button  className='Navprofile'>  
                    <NavMenu user={sessionUser} /> 
                    </button >   
                  
                </div> 
            )}
        </div>
    </nav>
);
}


export default Navigation;