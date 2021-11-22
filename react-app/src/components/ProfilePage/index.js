import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findFollows, followUser } from "../../store/follow"; 
import { getAllUsers } from "../../store/session";
import './Profile.css'     

  
function Profile () {  
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();  

    const sessionUser = useSelector((state) => state.session.user); 
    const thisPageUser = useSelector((state)=> state?.session?.allUsers?.filter((user) => user.id === +userId)[0])
    console.log(sessionUser)
    console.log(thisPageUser)  
   


    useEffect(() => {
        dispatch(getAllUsers());   
      }, [dispatch]);


    return (     

        <div> 
            <p> Profile Page {userId}</p>
            <p> {sessionUser?.id} |||| {thisPageUser?.username}</p>
            
            {sessionUser.id == userId && <p> welcome</p>} 
            <div className='prof-main' >
            


            </div>
        </div>
    )
}

export default Profile