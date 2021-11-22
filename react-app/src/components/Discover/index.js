import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; 
import {findDiscoverPosts } from '../../store/post'    
import './Discover.css'  

function Discover () { 
    const dispatch = useDispatch();       
 
    const discoverPosts = useSelector(state => state.post.discover)

  
    useEffect(() => {
        dispatch(findDiscoverPosts());  
        }, [dispatch]);
return (
    <div>
        <p> discover feed</p> 
        {discoverPosts?.map((post) => ( 
                <div className='card' key={post.id}> 
                    <div className='user'>
                        <Link to={`/users/${post.user.id}`}> 
                            <div 
                                className='avatar'
                                style={{backgroundImage: `url('${post.user.avatar}')`}} 
                            />
                        </Link>
                        <Link to={`/users/${post.user.id}`}>
                            <p className='text'> {post.user.f_name} {post.user.l_name}</p>
                        </Link>
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
                            {/* <FavoriteButton photoId={photo.id} favorites={favorites}/> */}
                            <p>{post.post.tags}</p>
                        </div>
                    </div>
                </div>
            ))}
    </div>
)
}

export default Discover 