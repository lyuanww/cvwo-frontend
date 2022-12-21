const errorsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "ADD_ERROR":
      return [action.error];
    case "CLEAR_ERROR":
      return [];
    default:
      return state;
  }
};

export default errorsReducer;
