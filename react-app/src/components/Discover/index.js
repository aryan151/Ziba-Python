import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; 
import {findDiscoverPosts } from '../../store/post'    
import FlickrStream from '../FlickrStream';
import './Discover.css'    

function Discover () { 
    const dispatch = useDispatch();       
 
    const discoverPosts = useSelector(state => state.post.discover)

  
    useEffect(() => {
        dispatch(findDiscoverPosts());  
        }, [dispatch]);
return (
    <div>
        <FlickrStream posts={discoverPosts}/>  
    </div>
)
}

export default Discover 