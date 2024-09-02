
const postsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_POSTS":
      return { 
        ...state, 
        posts: action.payload,
        loading : false, 
        error: null,
     };
    
    case "ADD_POST":
      return { 
        ...state, 
        posts: [...state.posts, action.payload],
        loading : false, 
        error: null,
     };

    default:
      return state;
  }
};

export default postsReducer;
