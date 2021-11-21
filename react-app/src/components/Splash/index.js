import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';   
import './Splash.css'
import LoginForm from '../auth/LoginForm' 
    
function Splash() {     
    const [toggleLogin, setToggleLogin ] = useState(true) 
    const [currentBGImage, setCurrentBGImage] = useState(0);
    const [currentHeader, setCurrentheader] = useState(0); 

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
        <div className='SplashscrollContainer'>   
            <div className='Splashslider'>
                <div className='Splashcarousel'>
                    <div className='Splashinner'>
                    <span class="change"></span> 
                    </div> 
                </div>
                <div className='Splashtext'>Social Media, Reimagined</div>    
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
        <div className='topbox'>  
            <div>
            {(toggleLogin === true) ? <LoginForm/>  :  "Already Have an Account?" }      
            </div>   
            <div className="redirectContainer">    
                <div className="redirectText">   
                    {(toggleLogin === true) ? "Don't have an account?" :  "Already Have an Account?" }   
                    <button onClick={() => setToggleLogin(!toggleLogin)}className='redirectSignUp'>Click Here</button>
                </div>    
                </div>
            </div>  
        </div> 
        </>
    );
};

export default Splash  