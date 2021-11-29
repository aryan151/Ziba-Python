import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {editOnePost,findSinglePost} from '../../../../store/post'    
import './EditPost.css'
function EditPost ({postId, post, user, close}) {  
    const dispatch = useDispatch();
    const history = useHistory(); 
    const [caption, setCaption] = useState(post?.caption);
    const [tags, setTags] = useState(post?.tags?.join(" "));  

    useEffect(() => {
        dispatch(findSinglePost(postId)); 
      }, [dispatch]);

      const handleSubmit = (e) => {
        e.preventDefault();
    
        const editedPost = {   
          post_id: postId,   
          caption,
          user_id: user?.id,    
          tags,    
        };     
    
        dispatch(editOnePost(editedPost)).then( () =>  
        dispatch(findSinglePost(+postId)));  
        // window.location.reload();
        // history.push(`/posts/${+postId}`)
        close(false) 
       
      };


    return (
        <>
        <div className='EditPostContainer'>
          
            <h1> Edit post Here</h1>  
            <div className="editcaption">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="capedit"
                placeholder="Write a caption..."
              />
            </div>  
            <div className="edittag">
              <input
                placeholder="Add Tags..."
                type="text"  
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="tagedit"
              />
            </div> 
            <button onClick={handleSubmit} className="editpostbtn">
                Edit
              </button>
        </div>   
        </>
    )
}

export default EditPost