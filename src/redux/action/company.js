import axios from 'axios';
export const getCompanyRedux = () => {
  return {
    type: 'GET_COMPANY',
    payload: new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:5200/api/v1/companies`)
        .then(result => {
          resolve({
            result
          });
        })
        .catch(err => {
          reject(err);
        });
    })
  };
};
