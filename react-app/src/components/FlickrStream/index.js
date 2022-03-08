import { Link } from 'react-router-dom';
import './FlickrStream.css'
  
 
function FlickrStream ({posts}) {
 
    return (

        <div className='flickrContainer'>
        <ul className='flickrWrapper'>
            {posts && posts.map((post) => (
                <div className='onePhotoContainer'>  
                    <p className={`hovertxt FKloc`}>{post?.post?.lat}</p>
                    <p className={`hovertxt FKtime `}>-{post?.post?.long}</p>
                    <li key={post?.post?.id} className='flickrPost'>   
                        <Link to={`/posts/${post?.post?.id}`}>
                            <img className='postOnStream' src={`${post?.post?.img_url}`} alt="streamphoto"/>
                        </Link>
                    </li>
                </div> 
            ))}  
            <li className='flickrPhoto'></li> 
        </ul>
    </div>
    )
}

export default FlickrStream