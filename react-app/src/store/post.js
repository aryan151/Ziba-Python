const GET_MASTER = "post/GET_MASTER";
const GET_DISCOVER_POSTS = "post/GET_DISCOVER_POSTS";
const GET_SINGLE_POST = "post/GET_SINGLE_POST"; 
const GET_POSTS = "post/GET_POSTS"   

 
const load = (posts) => ({
    type: GET_POSTS,  
    posts  
})    

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
 
//Comments: 


export const submitComment = (obj) => async (dispatch) => {
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
      return { ...state, discover: action.payload.discover };
    case GET_MASTER: 
      return { ...state, master: action.payload.master };
    case GET_SINGLE_POST:
        return { ...state, ...action.payload} 
    default:
      return state;
  }
}