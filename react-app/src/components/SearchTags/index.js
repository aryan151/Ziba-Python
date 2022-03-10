import {getAllSearchposts} from '../../store/post'     
import { useDispatch } from "react-redux"
import { useEffect } from "react" 
import { useParams } from "react-router" 

function SearchTags () {
    const dispatch = useDispatch()
    const {tag} = useParams()
    
    // useEffect(() => {
    //     dispatch(getAllSearchposts(String(tag)))  
    // }, [dispatch])
  
    return (
        <div>
            <p> {tag} </p>
        </div> 
    )

}

export default SearchTags