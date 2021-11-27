import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';   
import './Splash.css'
import LoginForm from '../auth/LoginForm' 
import SignUpForm from '../auth/SignUpForm'  
import { FiPlay } from "react-icons/fi";
    
function Splash() {     
    const [toggleLogin, setToggleLogin ] = useState(true)   
    const [currentBGImage, setCurrentBGImage] = useState(0);
    const [currentHeader, setCurrentheader] = useState(0); 
    const [formtoggle, setFormToggle] = useState(false)  
    const splashPhotos = [
        'https://ziba-aa.s3.amazonaws.com/splash4.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash5.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash6.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash3.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash1.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash7.jpg',
        'https://ziba-aa.s3.amazonaws.com/splash2.jpg'
    ]

    const splashHeader = [
        'Discover Beauty', 
        'Explore Memories',
        'Experience',
        'Build',  
        'Connect'     
    ]

    const shift = 6000; 
    const session = useSelector(state => state.session.user); 

    useEffect(() => {
        const changeBack = setInterval(() => {
            setCurrentBGImage((currentBGImage + 1) % splashPhotos.length); 
        }, shift);      
        return () => {
            clearInterval(changeBack)   
        }
    })   
  
    useEffect(() => {
        const changeBack = setInterval(() => { 
            setCurrentheader((currentHeader + 1) % splashHeader.length); 
        }, shift);      
        return () => {
            clearInterval(changeBack)   
        }
    })  

    if (session) {      
        return <Redirect to='/Home' />
    } 

  
    return (
    <>
        <div className='SplashPageWrapper'>  
            <div className='footer'>     
                <div className='FooterContent'>
                    <div className='FooterText'>Ziba</div>    
                </div>
                <div className='FooterCarText'>
                    <h1 className='FootPart1Anim'>A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. </h1>
                    <h1 className='FootPart2Anim'>A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. </h1>
                    <h1 className='FootPart1Anim'>A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. </h1>
                    <h1 className='FootPart2Anim'>A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. </h1>
                    <h1 className='FootPart1Anim'>A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality. A dose of reality.  </h1>  
                </div>
            </div>
            <div className='imagebackground'> 
            {splashPhotos.map((image, i) => (
                <img 
                id={i}
                key={i}
                className={i === currentBGImage ? `image active` : 'image'}
                src={image}
                style={{zIndex: `-${i + 1}`}} 
                alt='splash'
                />  
            ))}   
            <div>




                
        </div>
        {(formtoggle == false) ? <div className='SplashTopRight'>
            <FiPlay onClick={() => setFormToggle(true)}/> 
            
        </div> :   
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
                    </div>  }
                </div>
     
         



        </div>
    </>
    );
};

export default Splash  