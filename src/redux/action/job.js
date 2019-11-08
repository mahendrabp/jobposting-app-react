import axios from 'axios';

// export const getJobRedux = (
//   // search = '',
//   // location = '',
//   // limit = 5,
//   // page = 1,
//   // sortby = '',
//   // orderby = ''
//   options
// ) => {
//   return {
//     type: 'GET_JOB',
//     payload: new Promise((resolve, reject) => {
//       const {
//         search = '',
//         page = '',
//         limit = '',
//         location = '',
//         sortby = '',
//         orderby = ''
//       } = options;

// axios
//   .get(
//     `http://localhost:5200/api/v1/jobs?name=${search}&location=${location}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`
//   )
//         .then(result => resolve(result))
//         .catch(err => reject(err));
//     })
//   };
// };

export const getJobRedux = (
  search = '',
  location = '',
  limit = 6,
  page = 1,
  sortby = 'j.updated_at',
  orderby = 'desc'
) => {
  return {
    type: 'GET_JOB',
    payload: new Promise((resolve, reject) => {
      axios
        .get(
          `http://localhost:5200/api/v1/jobs?name=${search}&location=${location}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`
        )
        .then(result => {
          resolve({
            result,
            search,
            location,
            limit,
            page,
            sortby,
            orderby
          });
        })
        .catch(err => {
          reject(err);
        });
    })
  };
};

export const pushJobRedux = job => {
  return {
    type: 'PUSH_JOB',
    payload: job
  };
};
export const updateJobRedux = job => {
  return {
    type: 'UPDATE_JOB',
    payload: job
  };
};
export const deleteJobRedux = jobId => {
  return {
    type: 'DELETE_JOBB',
    payload: jobId
  };
};
