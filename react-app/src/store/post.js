const GET_MASTER = "post/GET_MASTER";
const GET_DISCOVER_POSTS = "post/GET_DISCOVER_POSTS";
const GET_SINGLE_POST = "post/GET_SINGLE_POST"; 
const GET_POSTS = "post/GET_POSTS"   
const GET_ARRAY_POSTS = "post/GET_ARRAY_POSTS"          
const SET_POST = "post/SET_POST"


const load = (posts) => ({
    type: SET_POST,
    payload: posts
})

const getAllUserPosts = (posts, userId) => ({
  type: GET_POSTS,
  payload: posts,
  userId,
});   

const getMaster = (posts) => ({
  type: GET_MASTER,
  payload: posts,  
});  

const getSingle = (posts) => ({
  type: GET_SINGLE_POST,
  payload: posts,
});


const getDiscoverPosts = (posts) => ({
  type: GET_DISCOVER_POSTS,
  payload: posts, 
});    

const getArrayPosts = (posts, userId) => ({
  type: GET_ARRAY_POSTS,  
  payload: posts,  
  userId 
});    
  
       

export const addPost = (post) => async (dispatch) => {
  await fetch("/api/posts/",
      {
          method: "POST",
          body: post
      }
  )
}

export const deletePost = (id) => async (dispatch) => {
  const response = await fetch("/api/posts/",
      {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id })   
      }
  )
  if (response.ok) {
      const data = await response.json()
      dispatch(load(data))
  } else return "DELETE THUNK ERROR: BAD REQUEST"
}
      
export const editOnePost = (postToEdit) => async (dispatch) => {
  const response = await fetch("/api/posts/",  
      {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postToEdit)    
      }
  )
  if (response.ok) {
      const data = await response.json()
      dispatch(load(data))
  } else return "EDIT THUNK ERROR: BAD REQUEST"  
}









//Master that gets back all user related information   
export const master = () => async (dispatch) => {
  const res = await fetch(`/api/posts/master`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getMaster(data));
  }
};   
 
export const findDiscoverPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/discover`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getDiscoverPosts(data)); 
  }
};   

export const findSinglePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/single/${postId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getSingle(data));  
  }
};  

export const findUserPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getAllUserPosts(data, userId));  
  }
};       
  
export const findSavedPosts = (userId) => async (dispatch) => {  
  const res = await fetch(`/api/posts/array/${userId}`)
  const data = await res.json();
  if (res.ok) { 
    dispatch(getArrayPosts(data, userId));      
  }  
};  

export const findTaggedPosts = (userId) => async (dispatch) => {  
  const res = await fetch(`/api/posts/tagged/${userId}`) 
  const data = await res.json();
  if (res.ok) { 
    dispatch(getArrayPosts(data, userId));      
  }  
};  


//Comments:          
    

export const newComment = (obj) => async (dispatch) => {
  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getMaster(data));  
};  
   
export const editComment = (editComment) => async (dispatch) => {
  const response = await fetch(`/api/comments/`,   
      {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editComment)   
      }
  )
  if (response.ok) {
      const data = await response.json()
      dispatch(load(data))
  } 
}

 
export const deleteComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/`, 
      {  
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment_id: id })
      }
  )    

  if (response.ok) {
      const data = await response.json()
      dispatch(load(data))
  } 
}




  

//Likes         

export const toggleLikePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json(); 
  dispatch(getMaster(data));  
};

  




const initialState = {};   

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_DISCOVER_POSTS:  
      return { ...state, discover: action.payload.discover }
    case GET_MASTER: 
      return { ...state, master: action.payload.master }
    case GET_ARRAY_POSTS:  
      return { ...state, arr: action.payload.arr }   
    case GET_SINGLE_POST:
        return { ...state, ...action.payload} 
    case GET_POSTS:   
        return { ...state, [action.userId]: action.payload }
    case SET_POST:
        return action.payload.posts  
    default:
      return state;
  }
}