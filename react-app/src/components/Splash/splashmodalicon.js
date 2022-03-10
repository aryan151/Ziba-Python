import React, { useState } from 'react';
import { Modal } from '../../context/Modal'; 
import SplashModal from './SplashModal'; 
import { FiPlay } from "react-icons/fi";

function SplashIcon() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='SplashTopRight' onClick={() => setShowModal(true)}> 
                <FiPlay/> 
            </button> 
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SplashModal />
                </Modal>
            )} 
        </>
    );
};

export default SplashIcon;