import React, { useRef } from "react";
import { useDetectOutsideClick } from '../../Navigation/NavMenu/NavBarClick' 
import { BsThreeDots } from "react-icons/bs";
import './PostNav.css'    


function PostNav() { 
    
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);


    return (
        <div className="dropDownContainer">
      <div className="avatarContainer navAvatar" onClick={onClick}>
        <BsThreeDots draggable="false" /> 
      </div>

      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >

        <ul>
          <li>
            <p className="avatarReroute">
              Edit Post
            </p>
          </li>
          <li>
            <p className="avatarReroute">
              Delete Post
            </p>
          </li>  
        </ul>
      </div>
    </div>
    )
}

export default PostNav


