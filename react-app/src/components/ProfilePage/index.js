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
    const follows = useSelector((state) => state.follow)
    console.log(follows) 
   


    useEffect(() => {
        dispatch(getAllUsers());   
      }, [dispatch]);

      useEffect(() => {
        dispatch(findFollows(+userId)); 
      }, [userId]);



    return (         
 
    <div className="profileContainer">   
        <div className="profileTop">
        <div className="profileAvatarBox">
          <div className="profileAvatarContainer">
            <img src={thisPageUser?.avatar} alt="User Avatar" />  
          </div>
        </div>
        <div className="profileBox">
          <div className="profileNameAndButtons">
            <div className="profileUserName">
              {thisPageUser?.username}
            </div>
            {thisPageUser && thisPageUser?.id !== sessionUser?.id ?
              <div className="profileButtonBox">
                <div>
                  {thisPageUser?.followers?.includes(sessionUser.id) ?
                    <button className="unfollow followingButton profileButton button">Followed</button> :
                    <button className="follow followingButton profileButton blueButton button">Follow</button>}
                </div>
              </div> :
              <div className="profileButtonBox">
                <button  className="editProfile profileButton button">Edit Profile</button>
                <button  className="editProfileModalButton button">Icon</button>
              </div> 
            }
          </div>
          <div className="profileDetails">
            <div className="profileCounts">
              <div className="profilePosts"><div className="profileCountsNumber">XX</div> posts</div>
              <div className="profileFollowers"><div className="profileCountsNumber">{follows[+userId]?.followers.length}</div> followers</div>
              <div className="profileFollowing"><div className="profileCountsNumber">{follows[+userId]?.following.length}</div> following</div>
            </div>
            <div className="profileUsernameAndPronoun"> 
              <div className="profileName">{thisPageUser?.f_name} {thisPageUser?.l_name}</div>
            </div>
            <div className="profileBio">
              {thisPageUser?.bio} 
            </div>
            {/* <div className="profileFollowedBy">Followed By <span className="profileFollowedByEmph">PEOPLE YOU KNOW</span> GOES HERE</div> */}
          </div>
        </div>
      </div>

















    </div>
        
    )
}

export default Profile