const initialState = {
  isLoading: false,
  user: {}
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_AUTH_USER':
      return Object.assign({}, state, { isLoading: true });
    case 'SET_AUTH_USER':
      return Object.assign(
        {},
        state,
        { isLoading: false, user: action.user }
      );
    default:
      return state;
  }
};

export default todos;
