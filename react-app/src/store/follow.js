const GET_FOLLOWS = "follow/GET_FOLLOWS";  

const getFollows = (users, userId) => ({
  type: GET_FOLLOWS,
  payload: users,
  userId,
});

export const findFollows = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getFollows(data, userId));
  }
};

export const followUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(getFollows(data, userId));
  }
};

export const unFollowUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(getFollows(data, userId));
  }
}

const initialState = { users: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWS:
      return { ...state, [action.userId]: action.payload };
    default:
      return state;
  }
}