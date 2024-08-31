export const UPDATE_POSTS = 'UPDATE_POSTS';
export const ADD_POST = 'ADD_POST';

const postsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return { ...state, posts: action.payload };
    
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    default:
      return state;
  }
};

export default postsReducer;
