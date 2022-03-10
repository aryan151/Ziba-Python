import {useEffect} from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { findFollows, findSuggestions } from "../../store/follow";  
import { master } from '../../store/post'   
import { logout } from "../../store/session";
import './Home.css'   
        
function Home() {             
    const dispatch = useDispatch()  
    const history = useHistory();
    const user = useSelector((state) => state.session?.user);    
    const followersPosts = useSelector((state) => state?.post?.master)
    const suggestions = useSelector((state) => state?.follow?.users); 
    useEffect(() => {
        dispatch(findFollows(user?.id));  
        dispatch(findSuggestions());
      }, [dispatch]);
    

    useEffect(() => {
    dispatch(master());
    }, [dispatch, user]);
  
    let postIds = []
    let dupecheck = followersPosts?.map((post) => {
        postIds.push(post?.post?.id)
    })
    return (
        <div className='homewrapper'>     
             <div className="home-left">
                 {
                     followersPosts?.length < 1 ? (
                        <div>
                        Submit A Post or Start Exploring!     
                        </div>
                     ) : (
                      <div className="home-posts"> 
                      <p> Feed </p>
                        {followersPosts?.map((post) => ( 
                            <div className='Homecard' key={post.id}> 
                                <div className='user'>
                                    <Link to={`/users/${post?.user?.id}`}>   
                                        <div 
                                            className='Homeavatar'
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
                                        
                                        {post?.post?.tags.map((tag) =>  (
                                                       <p className='tagtext' onClick={() => history.push(`/SearchTags/${tag}`)}>#{tag}    </p>      
                                                    ))}   
                                    </div>
                                </div>
                            </div>
                        ))}
                      </div>

                     )
                 }
             
             </div>
            <div className="home-right">
                <div className="home-right-card">
                    <div className="h-suggestions">
                        <div className="suggestions-title">Suggestions For You</div>
                        <div className="suggestions-list">
                        {suggestions?.length > 0 ? (
                            suggestions?.slice(0, 5).map((s, i) => (
                            <>
                                <div key={s + i} className="suggestion-card">
                                    <img
                                        onClick={() => history.push(`/users/${s.id}`)}
                                        className="suggestion-img" 
                                        src={s.avatar}
                                    />
                                    <div className="s-user-info">
                                        <div
                                        className="s-username"
                                        onClick={() => history.push(`/users/${s.id}`)}
                                        >
                                        {s.f_name} {s.l_name}
                                        </div>
                                        <div className="s-name">{s.name}</div>
                                    </div>
                                </div>
                            </>
                            ))
                        ) : (
                            <div className="home-no-suggestions">
                            No available suggestions
                            </div>
                        )}
                        </div>
                        </div>
                    </div>
                </div>

        </div>
    );
};
export default Home