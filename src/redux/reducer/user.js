const initial = {
  user: {},
  token: null,
  isLogin: false,
  isLoading: false
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        user: action.payload.data.user,
        token: action.payload.data.token
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
