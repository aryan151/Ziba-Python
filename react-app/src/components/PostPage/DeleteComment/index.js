import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import './DeleteComment.css'
import {deleteComment, findSinglePost} from '../../../store/post'  
    
function DeleteComment ({comment, onClose, postId}) {
    const dispatch = useDispatch()

    const submitDelete = (e) => {
        e.preventDefault();  
        dispatch(deleteComment(comment?.id)) 
        dispatch(findSinglePost(postId))  
        onClose(); 
    }

  
    return (    

        <form onSubmit={submitDelete} className="delete-message-form">
        <h1 className="deleteHeader">Delete Message</h1>
        <div className="deleteContent">
            <p className="deleteAsk">Are you sure you want to delete this message?</p>
            <div className="deleteCard">  
                    <div className="CommentToDelete">{comment?.body}</div>  
            </div>
        </div>    
        <div className="deleteCommentButtonContainer">  
            <p className="deleteCommentCancel" onClick={onClose}>Cancel</p>
            <button className={`deleteCommentButton`} onClick={submitDelete} >Delete</button>    
        </div>
    </form>
)
}

export default DeleteComment