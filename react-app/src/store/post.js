const GET_FOLLOWING_POSTS = "post/GET_FOLLOWER_POSTS";
const GET_DISCOVER_POSTS = "post/GET_DISCOVER_POSTS";
const GET_POSTS = "post/GET_POSTS"  
// const ADD = 'posts/ADD'  
// const DELETE = 'posts/DELETE'

 
const load = (posts) => ({
    type: GET_POSTS,  
    posts  
})    
 
const getDiscoverPosts = (posts) => ({
  type: GET_DISCOVER_POSTS,
  payload: posts, 
});  



const getFollowingPosts = (posts) => ({
  type: GET_FOLLOWING_POSTS,
  payload: posts,
});  


export const findFollowingPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/following`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getFollowingPosts(data));
  }
};   
 
export const findDiscoverPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/discover`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getDiscoverPosts(data)); 
  }
};   

  
const initialState = {};  

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_DISCOVER_POSTS:  
      return { ...state, discover: action.payload.discover };
    case GET_FOLLOWING_POSTS: 
      return { ...state, following: action.payload.following };
    default:
      return state;
  }
}