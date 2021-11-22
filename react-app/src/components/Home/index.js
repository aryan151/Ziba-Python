import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { findFollowingPosts } from '../../store/post'   
import './Home.css' 
        
function Home() {           
      
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user); 
    // const likes = useSelector(state => state?.likes?.likes)     
    // const saves = useSelector(state => state?.saves?.saves)   
    const feed =  useSelector((state) => state.post.following);   
    //Sort this array by created at     


    useEffect(() => {
        dispatch(findFollowingPosts());
      }, [dispatch, user]);

      
 
    return (
        <div className='wrapper'>    
                <p> TESTING </p>
            <p className='actP' >Feed</p>  
            {feed?.map((post) => (
                <div className='card' key={post.id}>
                    <div className='user'>
                        <Link to={`/users/${post.User.id}`}>
                            <div 
                                className='avatar'
                                style={{backgroundImage: `url('${post.User.avatarUrl}')`}} 
                            />
                        </Link>
                        <Link to={`/users/${post.User.id}`}>
                            <p className='text'> {post.User.f_name} {post.User.l_name}</p>
                        </Link>
                    </div>

                    <div>
                        <Link to={`/posts/${post.id}`}>
                            <div 
                                className='feedPhoto' 
                                style={{backgroundImage: `url('${post.img_url}')`}} 
                            />
                        </Link>
                    </div>

                    <div className='cardBottom' >
                        <div className='info'>
                            <p className='setting' >{post.caption}</p>
                        </div>
                        <div className='cardIcons'>
                            {/* <FavoriteButton photoId={photo.id} favorites={favorites}/> */}
                            <p>test</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Home