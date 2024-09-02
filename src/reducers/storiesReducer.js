const storiesReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_STORIES":
        return { 
          ...state, 
          stories: action.payload,
       };
    
      default:
        return state;
    }
  };
  
  export default storiesReducer;
  