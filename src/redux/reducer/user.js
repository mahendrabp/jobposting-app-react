const initial = {
  user: {},
  token: '',
  isLogin: '',
  isLoading: false,
  isError: false,
  message: ''
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
        isError: false,
        isLogin: true,
        token: action.payload.data.token
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLogin: false,
        message: action.payload.response.data.message
      };

    default:
      return state;
  }
};
