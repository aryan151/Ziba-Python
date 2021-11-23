import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { findFollows } from "../../store/follow";
import { master } from '../../store/post'   
import './Home.css'   
        
function Home() {           
    const dispatch = useDispatch()
 
    const user = useSelector((state) => state.session?.user);    
    const followersPosts = useSelector((state) => state?.post?.master)

    useEffect(() => {
        dispatch(findFollows(user?.id));  
      }, [dispatch]);
    

    useEffect(() => {
    dispatch(master());
    }, [dispatch, user]);
 
    return (
        <div className='wrapper'>    
            <p className='actP' >Feed</p>  
            {followersPosts?.map((post) => ( 
                <div className='card' key={post.id}> 
                    <div className='user'>
                        <Link to={`/users/${post?.user?.id}`}> 
                            <div 
                                className='avatar'
                                style={{backgroundImage: `url('${post?.user?.avatar}')`}} 
                            />
                        </Link>
                        <Link to={`/users/${post?.user?.id}`}>
                            <p className='text'> {post?.user?.f_name} {post?.user?.l_name}</p>
                        </Link>
                    </div> 
                    <div>
                        <Link to={`/posts/${post?.post?.id}`}> 
                            <div 
                                className='feedPhoto' 
                                style={{backgroundImage: `url('${post?.post?.img_url}')`}} 
                            />
                        </Link>
                    </div>

                    <div className='cardBottom' >
                        <div className='info'>  
                            <p className='setting' >{post?.post?.caption}</p>
                        </div>
                        <div className='cardIcons'>
                            {/* <FavoriteButton photoId={photo.id} favorites={favorites}/> */}
                            <p>{post.post.tags}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Home