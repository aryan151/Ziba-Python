const GET_FOLLOWING_POSTS = "post/GET_FOLLOWER_POSTS";

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


const initialState = {}; 

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_FOLLOWING_POSTS:
      return { ...state, following: action.payload.following };
    default:
      return state;
  }
}