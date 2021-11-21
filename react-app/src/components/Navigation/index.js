import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import NewPostModal from '../NewPost/'; 
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
            <NavLink exact to='/Home'>Logo</NavLink>
            {isLoaded && (
                <div className='Navbuttons'>  
                    <button  className='Navprofile'>  
                      <BsSearch/> 
                    </button>  
                    <button  className='Navprofile'>  
                      <AiOutlineHome/> 
                    </button>  
                    <button  className='Navprofile'>  
                      <BiMessage/> 
                    </button>  
                    <button  className='Navprofile'>  
                    {/* <NewPostModal/>  */}
                    </button>  
                    <button  className='Navprofile'>  
                      <AiOutlineCompass/> 
                    </button>  
                    <button  className='Navprofile'>  
                    <AiOutlineNotification/> 
                    </button>  
                    {/* <ProfileButton user={sessionUser} /> */}
                </div>
            )}
        </div>
    </nav>
);
}


export default Navigation;