import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";  
import { findFollows, followUser } from "../../store/follow";  
import { master, findDiscoverPosts, findSinglePost } from "../../store/post" 
import './PostPage.css'



function PostPage() {   
  
    const dispatch = useDispatch()     
    const { postId } = useParams();   

    const user = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.post?.single); 
    const f_posts = useSelector((state) => state.post?.master); 
    const d_posts = useSelector(state => state.post?.discover)   
    const u_posts = ''  

 
    useEffect(() => { 
        dispatch(findSinglePost(+postId));
        dispatch(findFollows(user?.id));
      }, [postId, user, f_posts, d_posts]);
  
    return (
        <div className='wrapper'>
            <p> Post {postId}</p>    
             <div className='card' key={post?.id}> 
                    <div className='user'>
                            <div 
                                className='avatar'
                                style={{backgroundImage: `url('${post?.user?.avatar}')`}} 
                            />
                            <p className='text'> {post?.user?.f_name} {post?.user?.l_name}</p>
                    </div> 
                    <div>
                            <div 
                                className='feedPhoto' 
                                style={{backgroundImage: `url('${post?.post?.img_url}')`}} 
                            />  
                    </div>

                    <div className='cardBottom' >
                        <div className='info'>  
                            <p className='setting' >{post?.post?.caption}</p>
                        </div>
                        <div className='cardIcons'> 
                            <p>{post?.post?.tags}</p> 
                        </div>
                    </div>
                </div> 
        </div>
    )
}


export default PostPage 