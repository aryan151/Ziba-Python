import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router"; 
import { findUserPosts, master } from '../../../store/post'
import FlickrStream from '../../FlickrStream' 

       
   
function ProfilePosts ({profileId}) {
  
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session?.user);    
    const posts = useSelector((state) => state.post[+profileId]?.posts); 
 

      useEffect(() => {
        dispatch(findUserPosts(+profileId));   
      }, [profileId]); 

    return (
<>
        <div>
            Posts {profileId}  |||      
    
        {console.log((posts))}   
 
        </div>
        <FlickrStream posts={posts} /> 
        </>
    )
}

export default ProfilePosts