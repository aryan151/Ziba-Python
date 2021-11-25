import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router"; 
import { findTaggedPosts, master } from '../../../store/post'
import FlickrStream from '../../FlickrStream'  


function ProfileTagged ({profileId}) {

    const dispatch = useDispatch();   
    const taggedPosts = useSelector(state => state.post.arr)
      
    useEffect(() => {
        dispatch(findTaggedPosts(+profileId));        
      }, [profileId]); 

    return ( 
        <>  
        <FlickrStream posts={taggedPosts} />  
        </>
    )
}

export default ProfileTagged   