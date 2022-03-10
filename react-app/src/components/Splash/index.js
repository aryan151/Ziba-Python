import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';   
import './Splash.css'
import LoginForm from '../auth/LoginForm' 
import SignUpForm from '../auth/SignUpForm'  
import { FiPlay } from "react-icons/fi";
import SplashIcon from './splashmodalicon'
function Splash() {     
    const [toggleLogin, setToggleLogin ] = useState(true)   
    const [currentBGImage, setCurrentBGImage] = useState(0);
    const [currentHeader, setCurrentheader] = useState(0); 
    const [formtoggle, setFormToggle] = useState(false)  
    const splashPhotos = [
        'https://ziba-aa.s3.amazonaws.com/splash4.jpg',
        'https://images.unsplash.com/photo-1543253464-213ff7db5ce7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1455&q=80',
        'https://ziba-aa.s3.amazonaws.com/splash5.jpg',
        'https://images.unsplash.com/photo-1587220387658-ff627d631be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://ziba-aa.s3.amazonaws.com/splash7.jpg',
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1534982841079-afde227ada8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',  
    ] 
 
    const splashHeader = [
        'Discover Beauty', 
        'Explore Memories',
        'Experience',
        'Build',  
        'Connect'     
    ]

    const shift = 5000; 
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

            <div className='FooterText'>Ziba</div>    
            <div className='footer'>     
                <div className='FooterCarText'>
                    <h1 className='FootPart1Anim'>A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. A moment of inspiration. </h1>
                    <h1 className='FootPart1Anim'>A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. A chance encounter. </h1>
                    <h1 className='FootPart1Anim'>A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. A touch of beauty. </h1>
                    <h1 className='FootPart1Anim'>A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. A fleeting memory. </h1>
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
 
        <SplashIcon/>
        </div>
     
         



        </div>
    </>
    );
};

export default Splash  