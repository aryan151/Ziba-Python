import { TiDeleteOutline } from "react-icons/ti"; 

function CommentHover({ comment, setCommentBeingEdited, setShowCommentHover, setShowDeleteCommentModal }) {

    const handleDelete = () => {
        setCommentBeingEdited(false);
        setShowDeleteCommentModal(comment.id);    
        setShowCommentHover(false); 
    }

    return ( 
        <>
            <div className="HoverCommentControl">  
                <div className="message-popup-container">
                    {/* <span className="iconCommentEdit" onClick={() => setCommentBeingEdited(comment.id)}>edit</span> */} 
                    <span className="iconCommentDelete" onClick={handleDelete}><TiDeleteOutline/></span>
                </div>
            </div>
        </>
     );
}
  
export default CommentHover; 