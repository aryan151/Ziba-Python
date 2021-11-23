import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findFollows, followUser } from "../../store/follow"; 
import { getAllUsers } from "../../store/session";
import profileAbout from './About' 
import profileAlbums from './Albums' 
import profilePosts from './Posts' 
import profileSaved from './Saved'
import profileTagged from "./Tagged";
import { BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineTag } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";  


import './Profile.css'     

  
function Profile () {    
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();  

    const [toggle, setToggle] = useState(2)  
    const sessionUser = useSelector((state) => state.session.user); 
    const thisPageUser = useSelector((state)=> state?.session?.allUsers?.filter((user) => user.id === +userId)[0])
    const follows = useSelector((state) => state.follow)   
   


    useEffect(() => {
        dispatch(getAllUsers());   
      }, [dispatch]);

      useEffect(() => {
        dispatch(findFollows(+userId)); 
      }, [userId]);



    return (         
    <>
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
            <div className="profileUsername"> 
              <div className="profileName">{thisPageUser?.f_name} {thisPageUser?.l_name}</div>
            </div>
            <div className="profileBio">
              {thisPageUser?.bio} 
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
              <div onClick={() => setToggle(3)} className={toggle === 3 ? 'listItem listItemActive' : 'listItem'}>
                <AiOutlineFolderOpen className={toggle === 3 ? 'imageActive' : null}  />  
                ALBUMS  
              </div>
              <div onClick={() => setToggle(4)} className={toggle === 4 ? 'listItem listItemActive' : 'listItem'}>
                <AiOutlineTag className={toggle === 4 ? 'imageActive' : null}  />  
                TAGGED  
              </div>
              {thisPageUser.id === sessionUser.id &&  
                <div onClick={() => setToggle(5)} className={toggle === 5 ? 'listItem listItemActive' : 'listItem'}>
                    <AiOutlineSave className={toggle === 5 ? 'imageActive' : null}  />  
                    SAVED    
                </div>}   
            </div>
        </div>

</div>
    </div>
    </>
        
    )
}

export default Profile