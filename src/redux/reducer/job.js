const initialState = {
  job: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  totalPage: '',
  infoPage: ''
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
      const { location, limit, page, sortby } = action.payload;
      return {
        ...state,
        isloading: false,
        isError: false,
        job: action.payload.result.data.data.result,
        search: action.payload.search,
        location,
        limit,
        page,
        sortby,
        orderby: action.payload.orderby,
        totalPage: action.payload.result.data.data.infoPage.maxPage,
        infoPage: action.payload.result.data.data.infoPage
      };
    //END GET JOBB

    //PUSH_JOB
    // case 'PUSH_JOB_PENDING':
    //   return {
    //     isLoading: true
    //   };

    case 'PUSH_JOB_FULFILLED':
      return {
        ...state,
        job: [...state.job, action.payload]
      };

    case 'DELETE_PRODUCT':
      const jobIndex = state.job
        .map(val => {
          return val.id;
        })
        .indexOf(action.payload);

      delete state.job[jobIndex];

      return {
        ...state,
        job: state.job
      };

    //UPDATE_JOB
    // case 'UPDATE_JOB':
    //   const job = state.job.find(job => {
    //     return job.id === action.payload.id;
    //   });

    //   job.name = action.payload.name;
    //   job.description = action.payload.description;
    //   job.location = action.payload.location;
    //   job.category_id = action.payload.category_id;
    //   job.company_id = action.payload.company_id;
    //   job.salary = action.payload.salary;

    //   return {
    //     ...state,
    //     job: state.job
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
