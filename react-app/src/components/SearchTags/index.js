import {getAllSearchposts} from '../../store/post'     
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react" 
import { useParams } from "react-router" 
import FlickrStream from '../FlickrStream/index'    

function SearchTags () {

    const dispatch = useDispatch()
    const params = useParams() 
    const posts = useSelector(state => state?.post) 
    

useEffect(() => {
    dispatch(getAllSearchposts())  
    }, [dispatch]);

   

      const taggedPosts = posts.filter((post) =>
      post?.tags?.includes(params.tag) 
      );     

    return (
        <div>
            <h1> #{params.tag} </h1> 
            {console.log(taggedPosts)}   
            <FlickrStream posts={taggedPosts}/>    
        </div> 
    )

}

export default SearchTags