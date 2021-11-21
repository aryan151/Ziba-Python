import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewPost from './NewPost'    
import { BsCloudPlus } from "react-icons/bs";
import '../Navigation/Navigation.css';  
  
function NewPostModal() { 
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            < BsCloudPlus onClick={() => setShowModal(true)}/>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewPost />
                </Modal>
            )}    
        </>
    );
};

export default NewPostModal;  