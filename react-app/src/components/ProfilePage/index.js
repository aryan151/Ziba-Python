import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findFollows, followUser, unFollowUser } from "../../store/follow"; 
import { getAllUsers } from "../../store/session";
import { findUserPosts } from "../../store/post"; 
import ProfileAbout from './About'   
import ProfilePosts from './Posts'     
import ProfileSaved from './Saved'
import ProfileTagged from "./Tagged"; 
import { BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineTag } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";  
import { AiOutlineSave } from "react-icons/ai";  


import './Profile.css'     

  
function Profile () {    
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();  
 
    const [toggle, setToggle] = useState(2)  
    const sessionUser = useSelector((state) => state?.session?.user); 
    const user = useSelector((state) => state.user.user);
    const thisPageUser = useSelector((state)=> state?.session?.allUsers?.filter((user) => user.id === +userId)[0])
    const follows = useSelector((state) => state.follow)  
    const [following, setFollowing] = useState(false);

    useEffect(() => {  
        dispatch(getAllUsers());   
      }, [dispatch]);

      useEffect(() => {
        dispatch(findFollows(+userId)); 
      }, [userId]);  
  
      useEffect(() => {
        const followers = follows[+userId]?.followers;
        const result = followers?.find((f) => f.id === sessionUser?.id);
        if (result) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      }, [userId, user, follows]); 

  
      const followUser = () => {
        dispatch(followUser(+userId));
      };

      const unfollowUser = () => { 
        dispatch(unFollowUser(+userId))
      }

    return (         
    <>
    <div className="profileContainer">    
    {console.log(user)}
        <div className="profileTop">
        <div className="profileAvatarBox">
          <div className="profileAvatarContainer">
            <img src={thisPageUser?.avatar} alt="User Avatar" />  
          </div>
        </div>
        <div className="profileBox">
          <div className="profileNameAndButtons">
            <div className="profileUserName">
            {thisPageUser?.f_name} {thisPageUser?.l_name}
            </div>
            {thisPageUser && thisPageUser?.id !== sessionUser?.id ? 
              <div className="profileButtonBox">
                <div>  
                  {(following === true) ?  
                    <button className="unfollow followingButton profileButton button" onClick={unfollowUser}>Followed</button> :  
                    <button  className="follow followingButton profileButton blueButton button" onClick={followUser}>Follow</button>} 
                </div>
              </div> :
              <div className="profileButtonBox">
                <button  className="editProfile profileButton button">Edit Profile</button>
              </div> 
            }
          </div>  
          <div className="profileDetails">
            <div className="profileCounts">
              <div className="profileFollowers"><div className="profileCountsNumber">{follows[+userId]?.followers.length}</div> followers</div>
              <div className="profileFollowing"><div className="profileCountsNumber">{follows[+userId]?.following.length}</div> following</div>
            </div>
            <div className="profileUsername"> 
              <div className="profileName"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="profileSwitchBox">
          <div className="imageListContainer">
            <div className="imageList">
              <div onClick={() => setToggle(1)} className={toggle === 1 ? 'listItem listItemActive' : 'listItem'} >
                <BsInfoSquare className={toggle === 1 ? 'imageActive' : null}  /> 
                ABOUT
              </div>
              <div onClick={() => setToggle(2)} className={toggle === 2 ? 'listItem listItemActive' : 'listItem'}>
                <BsGrid3X3Gap className={toggle === 2 ? 'imageActive' : null}  />  
                POSTS  
              </div>
              <div onClick={() => setToggle(4)} className={toggle === 4 ? 'listItem listItemActive' : 'listItem'}>
                <AiOutlineTag className={toggle === 4 ? 'imageActive' : null}  />  
                TAGGED  
              </div>
                <div onClick={() => setToggle(5)} className={toggle === 5 ? 'listItem listItemActive' : 'listItem'}>
                    <AiOutlineSave className={toggle === 5 ? 'imageActive' : null}  />  
                    LIKES    
                </div> 
            </div>
        </div>   
        {toggle === 1 && <ProfileAbout/> }   
        {toggle === 2 && <ProfilePosts profileId={thisPageUser?.id}/>  } 
        {toggle === 4 && <ProfileTagged profileId={thisPageUser?.id}/> }    
        {toggle === 5 && <ProfileSaved profileId={thisPageUser?.id}/>  }    

        </div>
    </div>
    </>
        
    )
}

export default Profile