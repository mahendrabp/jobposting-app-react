const initialState = {
  isLoading: false,
  isError: '',
  company: [],
  message: ''
};

const company = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'GET_COMPANY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isloading: false,
        isError: false,
        company: action.payload.data.data
      };

    case 'ADD_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'ADD_COMPANY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        company: [...state.company, action.payload.data.data],
        message: action.payload.data.message
      };
    case 'ADD_COMPANY_REJECTED':
      // console.log(action.payload.response.data.message);
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        company: [...state.company]
      };

    default: {
      return state;
    }
  }
};

export default company;
