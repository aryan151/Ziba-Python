import { useState, useRef } from 'react';
import { editComment, findSinglePost} from '../../../store/post';
import { useDispatch, useSelector,  } from "react-redux" 
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker  } from 'emoji-mart' 
import './EditComment.css'  

function EditComment ({ comment, setCommentBeingEdited, commentBeingEdited, setShowDeleteCommentModal, postId }) {
    const dispatch = useDispatch()
    const editCommentRef = useRef();
    const [editedComment, setEditedComment] = useState(comment.body);
    const [editCommentError, setEditCommentError] = useState('');
    const [commentCharacterCounter, setCommentCharacterCounter] = useState(comment.body.length);
    const [showEmojiPicker, setShowEmojiPicker] = useState('');        
       
    const handleChange = (e) => {
        setEditedComment(e.target.value);
        setCommentCharacterCounter(e.target.value.length);
    }


    const handleEscEnter = (e) => {
        if (e.key === "Escape") {
            setCommentBeingEdited(false);
            setEditedComment(comment.body)  
            return
        }

        if (commentCharacterCounter > 300 && e.key === "Enter") {
            e.preventDefault();
            setEditCommentError('Comment cannot exceed 300 characters.');
            return;
        }

        if (e.key === "Enter" && commentCharacterCounter === 0) {
            setEditCommentError('');
            setCommentBeingEdited(false);  
            setEditedComment(comment.body);
            setShowDeleteCommentModal(comment.id); 
            return
        }

        if (/^\s*$/.test(editedComment)) {
            return;
        } 

        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    const handleCancel = () => {
        setShowEmojiPicker(false); 
        setCommentBeingEdited(false);
        setEditCommentError('');
        setEditedComment(comment.body);
        setCommentCharacterCounter(comment.body.length);  
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (commentCharacterCounter === 0) {         
            setShowDeleteCommentModal(comment?.id);
            setCommentBeingEdited(false);  
            setEditedComment(comment.body);
            return
        }  

        if (commentCharacterCounter > 300) {
            setEditCommentError('Comment cannot exceed 300 characters.');
            return;
        }

        if (/^\s*$/.test(editedComment)) {
            setEditCommentError('Comment cannot contain only spaces.')
            return;
        } 

        setEditCommentError('');
        setShowEmojiPicker(false);

        const newComment = {
            id: comment?.id, 
            body: editedComment 
        } 
        dispatch(editComment(newComment)) 
        dispatch(findSinglePost(postId))
        setCommentBeingEdited(false);  
    }    

    const handleEmoji = (emoji) => {
        setEditedComment(editedComment + emoji.native);
        editCommentRef.current.focus();
        setShowEmojiPicker(false);  
    }

    const handleEmojiPicker = () => {
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setShowEmojiPicker(true);
        }
    }

    return (   
        commentBeingEdited === comment.id ? (  
            <> 
                <form className="commentEditModule">
                    { showEmojiPicker && 
                        <NimblePicker 
                            set='google'
                            data={data}
                            theme={"dark"} 
                            style={{position: 'absolute', zIndex: 30, right: "60px", bottom: "100px"}} 
                            onSelect={(emoji) => handleEmoji(emoji)}
                        />
                    }

                    <p onClick={handleEmojiPicker} className="EditCommentEmoji">🤗</p>  
                        
                    <textarea 
                        ref={editCommentRef}
                        className="commentEditText"  
                        value={editedComment} 
                        onChange={handleChange}
                        onKeyDown={handleEscEnter}  
                        rows={(editedComment.length / 200) + 3}   
                    ></textarea> 
                </form>    
                        <div className="commentEditOptions">     
                            <p className="commentEditCancel">escape to <span onClick={handleCancel} className="commentEditButtonCancel">cancel</span></p>
                            <span className="commentOptionsBreaker">•</span>
                            <p className="commentEditSave">enter to <span onClick={handleSubmit} className="commentEditButtonSave">save</span></p>
                            { editCommentError && 
                                <p className="commentErrors">{editCommentError}</p>  
                            }
                        </div>
                        <p className={`commentEditCounter`}>{commentCharacterCounter}/300</p>  
            </>
        ):(
            <div className="CommentContentText">{comment.body}</div>   
        )
    );
}

export default EditComment; 