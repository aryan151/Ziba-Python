import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router"; 
import { findUserSaved, master } from '../../../store/post'
import FlickrStream from '../../FlickrStream'      
 
function ProfileSaved ({profileId, profile}) {    

    const dispatch = useDispatch();  
    const discoverPosts = useSelector(state => state.post.saved)
    const SavedIds = profile.saved        


    useEffect(() => {
        dispatch(findUserSaved(+profileId));     
      }, [profileId]); 

    return ( 
        <>
            <div>
                Saved!   
                {SavedIds[0]}
          

                {console.log(SavedIds)}
            </div>
        {/* <FlickrStream posts={posts} />  */}
        </>
    )
}

export default ProfileSaved