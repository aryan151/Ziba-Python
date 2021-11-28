import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from '../../Navigation/NavMenu/NavBarClick'   
import { Modal } from "../../../context/Modal";
import { BsThreeDots } from "react-icons/bs";
import './PostNav.css'    
import DeletePost from "./DeletePost/DeletePost";   
import EditPost from "./EditPost/EditPost"

function PostNav() { 

    const [showModalDelete, setShowModalDelete] = useState(false); 
    const [showModalEdit, setShowModalEdit] = useState(false);   
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
        <li onClick={() => {setShowModalEdit(true); onClick()}}>     
            <p className="avatarReroute">
              Edit Post
            </p>
          </li>
          <li onClick={() => {setShowModalDelete(true); onClick()}}>     
            <p className="avatarReroute">
              Delete Post  
            </p>
          </li>  
        </ul>
      </div>  
      {showModalDelete && (
        <Modal onClose={() => setShowModalDelete(false)}>
            <DeletePost /> 
        </Modal>
      )}    
      {showModalEdit&& (
        <Modal onClose={() => setShowModalEdit(false)}>
            <EditPost /> 
        </Modal>
    )}    
    </div>
    )
}

export default PostNav


