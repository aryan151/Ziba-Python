import React, { useEffect, useState } from 'react'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import './BackUp.css'
 
const BackUp = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () =>
            window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)
 
        window.addEventListener('scroll', toggleVisibility) 
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return isVisible ? (
        <div className='scrollTop'>
            <a href='#top'>
                <BsFillArrowUpSquareFill className='arrow' />
            </a>
        </div>
    ) : null
}

export default BackUp