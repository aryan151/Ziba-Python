import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findFollows, followUser } from "../../store/follow"; 
import './Profile.css'  


function Profile () {

    const currentUser = useSelector((state) => state.session.user);
    const { userId } = useParams();
    return ( 

        <div> 
            <p> Profile Page {userId}</p>
            {currentUser.id == userId && <p> welcome</p>} 
        </div>
    )
}

export default Profile