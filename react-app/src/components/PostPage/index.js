import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from 'react-router-dom'; 
import { Modal } from '../../context/Modal' 
import { useDispatch, useSelector } from "react-redux";  
import { findFollows, followUser } from "../../store/follow";  
import { master, findDiscoverPosts, findSinglePost, toggleLikePost, newComment} from "../../store/post" 
import { RiHeart2Fill } from "react-icons/ri";
import { RiHeart2Line } from "react-icons/ri"; 
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css' 
import { NimblePicker  } from 'emoji-mart' 
import DeleteComment from './DeleteComment'
import EditComment from './EditComment'
import CommentHover from './CommentHover' 


import './PostPage.css' 
//ellipses       


function PostPage() {    
    const history = useHistory() 
    const commentRef = useRef();
    const dispatch = useDispatch()     
    const { postId } = useParams();   

    const user = useSelector((state) => state.session?.user);
    const post = useSelector((state) => state.post?.single); 
    const f_posts = useSelector((state) => state.post?.master); 
    const d_posts = useSelector(state => state.post?.discover)   
    const u_posts = ''  
 
    const [showEmojiPicker, setShowEmojiPicker] = useState('');
    const [comment, setComment] = useState(''); 
    const [commentCharacterCounter, setCommentCharacterCounter] = useState(0);
    const [commentError, setCommentError] = useState(''); 
    const [showCommentHover, setShowCommentHover] = useState(false);  
    const [commentBeingEdited, setCommentBeingEdited] = useState(false);
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);  
 

    useEffect(() => {  
        dispatch(findSinglePost(+postId));
        dispatch(findFollows(user?.id)); 
      }, [postId, user, f_posts, d_posts]);
  


    const keydownEnter = (e) => {
        if (commentCharacterCounter > 300 && e.key === "Enter") {
            e.preventDefault();
            setCommentError('Comment cannot exceed 300 characters.');
            return;
        }

        //Test for comment with only spaces 
        if (/^\s*$/.test(comment)) {
            return;
        } 
        
        if (e.key === "Enter") {
            enterComment(e); 
            setCommentError('') 
        }
    }
    const enterComment = (e) => {
        e.preventDefault();
        const addComment = {
            user_id: +user.id,
            post_id: +postId,
            body: comment
        }
        dispatch(newComment(addComment));    
        setComment('');
        setCommentCharacterCounter(0)
    }

    const handleHoverOn = (commentId) => {
    
        setShowCommentHover(commentId) 
    }

    const handleHoverOff = () => {
    
        setShowCommentHover(false) 
    }


    const handleEmoji = (emoji) => {
        setComment(comment + emoji.native);
        commentRef.current.focus();
        setShowEmojiPicker(false);
    }
    const handleText = (e) => {
        setComment(e.target.value)
        setCommentCharacterCounter(0+e.target.value.length)
    }
    const handleEmojiPicker = () => { 
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setShowEmojiPicker(true);
        }
    }



    const like = (id) => { 
        dispatch(toggleLikePost(id)).then(() => dispatch(master(user?.id)));
      }; 
    

    return (
        <div className='SoloWrapper'>    
            <div className='Solocard' key={post?.id}> 
                <div className='SoloCardInfo'>
                    <div className='SoloAvatar' 
                        style={{backgroundImage: `url('${post?.user?.avatar}')`}} 
                    />
                        <p className='Solotext'> {post?.user?.f_name} {post?.user?.l_name}</p>
                    </div> 
                    <div className='SoloSplit'> 
                                    <div className='SoloCardLeft'> 
                                            <div>
                                                <div className='SoloPhoto' 
                                                    style={{backgroundImage: `url('${post?.post?.img_url}')`}} 
                                                />  
                                            </div>
                                            <div className='SolocardBottom' >
                                                <div className='Soloinfo'>  
                                                    <p className='setting' >{post?.post?.caption}</p>
                                                </div>
                                                <div className='SolocardIcons'>  
                                                <p>{post?.likes?.length}</p>
                                                {post?.likes?.length > 0 && post?.likes?.find((p) => p.id === user?.id) !== undefined ? (
                                                    <div className="SoloLikeIcon" onClick={() => like(post.post.id)}>
                                                        <RiHeart2Fill/>
                                                    </div>
                                                    ) : (
                                                    <div className="SoloLikeIcon" onClick={() => like(post.post.id)}>
                                                        <RiHeart2Line/>  
                                                    </div>
                                                    )}
                                                </div>
                                            </div>  
                                    </div>     
                                    <div className='SoloCardRight'>
                                    <div className='SoloCardComments'>     
                                        <div className='CommentZone'>
                                            {post?.comments?.map((comment, i) => (
                                            <div key={comment?.comment?.id}>
                                                { showDeleteCommentModal === comment?.comment?.id && 
                                                    <Modal onClose={() => setShowDeleteCommentModal(false)} comment={comment?.comment}>
                                                        <DeleteComment onClose={() => setShowDeleteCommentModal(false)} comment={comment?.comment} />
                                                    </Modal>
                                                }
                                                <div className="OneCommentContainer"  
                                                onMouseOver={() => handleHoverOn(comment?.comment?.id)}
                                                onMouseLeave={handleHoverOff} 
                                                >
                                                    <div className="CommentProfileContainer"> 
                                                        <img className="CommentImg" src={comment?.user?.avatar} alt="" />
                                                    </div>
                                                    <div className="OneCommentInfo">  
                                                        <div className="commentUserName">{comment?.user?.username}  
                                                            <span className="commentDate">{comment?.comment?.createdAt.split(" ").slice(1, 4).join(" ")}</span>
                                                        </div> 
                                                        
                                                        <EditComment 
                                                            setCommentBeingEdited={setCommentBeingEdited} 
                                                            comment={comment?.comment} 
                                                            commentBeingEdited={commentBeingEdited}
                                                            setShowDeleteCommentModal={setShowDeleteCommentModal}
                                                        />
                                                    </div> 
                                                    { showCommentHover === comment?.comment?.id && user.id === comment?.comment?.user_id && 
                                                    <CommentHover     
                                                    comment={comment?.comment} 
                                                    setCommentBeingEdited={setCommentBeingEdited}
                                                    setShowCommentHover={setShowCommentHover} 
                                                    setShowDeleteCommentModal={setShowDeleteCommentModal}
                                                    />}
                                                </div> 
                                                </div>
                    ))}
                    </div>
                    <div className='MakeComment'>   
                        <div onSubmit={enterComment} className="commentInputContainer">
                            <form className="addCommentForm"> 
                                { showEmojiPicker && 
                                    <NimblePicker 
                                        set='google'
                                        data={data}
                                        theme={"dark"} 
                                        style={{position: 'absolute', zIndex: 5, left: "10px", bottom: "100px"}} 
                                        onSelect={(emoji) => handleEmoji(emoji)} 
                                    />
                                }
                                <p onClick={handleEmojiPicker} className="emoji-selector">🤗</p>  
                                <label className="addCommentLabel">
                                    <textarea 
                                        type="text" 
                                        className="addCommentInput"
                                        value={comment}
                                        onChange={handleText}
                                        onKeyDown={keydownEnter}    
                                        ref={commentRef}
                                        placeholder={`Add A Comment...`}
                                    ></textarea>
                                    <p className='commentCounter'>{commentCharacterCounter}/300</p>
                                    { commentError &&   
                                        <p className="message-error">{commentError}</p> 
                                    }
                                </label>  
                            </form>
                        </div>
                    </div>
                </div>
                </div>
                </div> 
                </div> 
        </div>
    )
}


export default PostPage 