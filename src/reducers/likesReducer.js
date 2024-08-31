const likesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LIKE": {
      const { postId } = action.payload;
      return {
        ...state,
        [postId]: !state[postId],  // Alterna el estado del like para el postId
      };
    }
    default:
      return state;
  }
};

export default likesReducer;
