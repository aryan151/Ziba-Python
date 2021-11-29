import {deletePost, findUserPosts} from '../../../../store/post'  
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

function DeletePost ({postId, user}) {  
    
    const dispatch = useDispatch()
    const history = useHistory()
    const handleDelete = () => {
        dispatch(deletePost(postId)).then(() => 
        dispatch(findUserPosts(user.id))
        )  
        
        history.push(`/users/${user.id}`)
      } 


    return (  
        <div>
            <p> Are you sure?</p>
            <button className='deletepostbutton' onClick={handleDelete}>Delete</button>
        </div>  
    )
}

export default DeletePost