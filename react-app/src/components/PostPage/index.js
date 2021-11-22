import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";  
import { findFollows, followUser } from "../../store/follow";  
import {setAllImages} from '../../store/post'  

function PostPage() {   
    const dispatch = useDispatch() 
    const { postId } = useParams();
 
    const posts = useSelector(state => state.post.Allposts) 


    return (
        <div>
            <p> {postId} {posts}</p>  
            {/* <div className='card' key={post.id}> 
                    <div className='user'>
                            <div 
                                className='avatar'
                                style={{backgroundImage: `url('${post.user.avatar}')`}} 
                            />
                            <p className='text'> {post.user.f_name} {post.user.l_name}</p>
                    </div> 
                    <div>
                        <Link to={`/posts/${post.post.id}`}> 
                            <div 
                                className='feedPhoto' 
                                style={{backgroundImage: `url('${post.post.img_url}')`}} 
                            />
                        </Link>
                    </div>

                    <div className='cardBottom' >
                        <div className='info'>  
                            <p className='setting' >{post.post.caption}</p>
                        </div>
                        <div className='cardIcons'>
                            <FavoriteButton photoId={photo.id} favorites={favorites}/>
                            <p>{post.post.tags}</p>
                        </div>
                    </div>
                </div> */}  
        </div>
    )
}


export default PostPage 