import './DeleteComment.css'
 
    
function DeleteComment ({comment, onClose}) {


    const submitDelete = (e) => {
        e.preventDefault();  

        onClose();
    }


    return (

        <form onSubmit={submitDelete} className="delete-message-form">
        <h1 className="deleteHeader">Delete Message</h1>
        <div className="deleteContent">
            <p className="deleteAsk">Are you sure you want to delete this message?</p>
            <div className="deleteCard">  
                    <div className="CommentToDelete">{message.body}</div>  
            </div>
        </div>
        <div className="deleteCommentButtonContainer">
            <p className="deleteCommentCancel" onClick={onClose}>Cancel</p>
            <button className={`deleteCommentButton`} >Delete</button>    
        </div>
    </form>
)
}

export default DeleteComment