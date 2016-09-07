const initialState = {
  isFetching: false,
  error: null,
  user: {}
};

const fetchAuthUser = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return Object.assign({}, state, { isFetching: true, user: {}, error: null });
    case 'SUCCESS':
      return Object.assign({}, state, { isFetching: false, user: action.payload });
    case 'FAILURE':
      return Object.assign({}, state, { isFetching: false, user: {}, error: action.error });
    default:
      return state;
  }
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_AUTH_USER':
      return fetchAuthUser(state, action);
    default:
      return state;
  }
};

export default todos;
