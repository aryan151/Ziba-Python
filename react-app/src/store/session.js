// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_ALL = "session/GET_ALL";

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const getAll = (users) => ({
  type: GET_ALL,
  payload: users,
});



const initialState = { user: null, allUsers: null }; 


export const getAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");

  if (response.ok) {
    const data = await response.json();  

    dispatch(getAll(data));  
  }
};




export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (Data) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: Data,   
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const addSave = (user_id, post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/saved/${user_id}/${post_id}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));        
  } 
};

export const deleteSave = (user_id, post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/saved/${user_id}/${post_id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
  } 
};

export const updateUser = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}`);

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
  }
};





 
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload} 
    case GET_ALL: 
      return { user: state.user, allUsers: action.payload.users };
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
