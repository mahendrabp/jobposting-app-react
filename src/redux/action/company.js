import axios from 'axios';
// import company from '../reducer/company';
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

export const addCompanyRedux = company => {
  return {
    type: 'PUSH_PRODUCT',
    payload: company
  };
};
