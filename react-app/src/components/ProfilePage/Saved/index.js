import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router"; 
import { findSavedPosts, master } from '../../../store/post' 
import FlickrStream from '../../FlickrStream'      
   
function ProfileSaved ({profileId}) {    

    const dispatch = useDispatch();   
    const savedPosts = useSelector(state => state.post.arr)
          
    useEffect(() => {
        dispatch(findSavedPosts(+profileId)) ;       
      }, [profileId]); 

    return ( 
        <>   
        <FlickrStream posts={savedPosts} /> 
        </>
    )
}

export default ProfileSaved