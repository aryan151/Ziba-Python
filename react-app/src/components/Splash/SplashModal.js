import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';   
import './Splash.css'
import LoginForm from '../auth/LoginForm' 
import SignUpForm from '../auth/SignUpForm'   

function SplashModal() {
    const [toggleLogin, setToggleLogin ] = useState(true)    
    const [formtoggle, setFormToggle] = useState(false)  

    return (
        <> 


                    <div className='topbox'>  
                    <div>
                    {(toggleLogin === true) ? <LoginForm/>  :  <SignUpForm/> }      
                    </div>     
                    <div className="redirectContainer">    
                        <div className="redirectText">   
                            {(toggleLogin === true) ? "Don't have an account?" :  "Already Have an Account?" }   
                            <button onClick={() => setToggleLogin(!toggleLogin)}className='redirectSignUp'>Click Here</button>
                        </div>    
                        </div>
                    </div> 
             
     
         
 


       
    </>
    );
}; 

export default SplashModal;