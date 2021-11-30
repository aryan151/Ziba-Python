import {getAllSearchposts} from '../../store/post'     
import { useDispatch } from "react-redux"
import { useEffect } from "react" 
import { useParams } from "react-router" 

function SearchTags () {
    const dispatch = useDispatch()
    const {name} = useParams()
    
    useEffect(() => {
        dispatch(getAllSearchposts(String(name)))
    }, [dispatch])

    return (
        <div>
            <p> test </p>
        </div>
    )

}

export default SearchTags