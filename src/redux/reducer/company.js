const initialState = {
  isLoading: false,
  isError: false,
  company: []
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
      return {
        ...state,
        isloading: false,
        isError: false,
        company: action.payload.result.data.data
      };

    default: {
      return state;
    }
  }
};

export default company;
