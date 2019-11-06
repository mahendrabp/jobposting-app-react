const initialState = {
  job: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const job = (state = initialState, action) => {
  switch (action.type) {
    //GET_JOB
    case 'GET_JOB_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_JOB_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        job: []
      };
    case 'GET_JOB_FULFILLED':
      return {
        ...state,
        isloading: false,
        isError: false,
        job: action.payload.result.data.data.result,
        search: action.payload.search,
        location: action.payload.location,
        limit: action.payload.limit,
        page: action.payload.page,
        sortby: action.payload.sortby,
        orderby: action.payload.orderby
      };
    //END GET JOBB

    // //PUSH_JOB
    // case 'PUSH_JOB_PENDING':
    //   return {
    //     isLoading: true
    //   };
    // case 'PUSH_JOB_REJECTED':
    //   return {
    //     isLoading: false,
    //     isError: true
    //   };
    // case 'PUSH_JOB_FULFILLED':
    //   return {
    //     isloading: false,
    //     isError: false,
    //     job: action.payload.data.data.result
    //   };
    // //END PUSH JOB

    // //UPDATE_JOB
    // case 'UPDATE_JOB_PENDING':
    //   return {
    //     isLoading: true
    //   };
    // case 'UPDATE_JOB_REJECTED':
    //   return {
    //     isLoading: false,
    //     isError: true
    //   };
    // case 'UPDATE_JOB_FULFILLED':
    //   return {
    //     isloading: false,
    //     isError: false,
    //     job: action.payload.data.data.result
    //   };
    // //END UPDATE JOB

    // //DELETE_JOB
    // case 'DELETE_JOB_PENDING':
    //   return {
    //     isLoading: true
    //   };
    // case 'DELETE_JOB_REJECTED':
    //   return {
    //     isLoading: false,
    //     isError: true
    //   };
    // case 'DELETE_JOB_FULFILLED':
    //   return {
    //     isloading: false,
    //     isError: false,
    //     job: action.payload.data.data.result
    //   };
    // //DELETE_JOB

    default: {
      return state;
    }
  }
};

export default job;
