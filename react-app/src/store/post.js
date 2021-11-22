const GET_FOLLOWING_POSTS = "post/GET_FOLLOWER_POSTS";
const LOAD = 'allPosts/LOAD'
// const ADD = 'posts/ADD'
// const DELETE = 'posts/DELETE'



const load = posts => ({
    type: LOAD,  
    posts
})


export const getAllPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/posts/all/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}






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
    case LOAD: {
      const allPosts = {};
      action.posts.posts.forEach(post => {
          allPosts[post.id] = post
      });
      return {
          ...allPosts,
          // ...state,
      }
  } 
    case GET_FOLLOWING_POSTS:
      return { ...state, following: action.payload.following };
    default:
      return state;
  }
}