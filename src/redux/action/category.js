import axios from 'axios';
// import company from '../reducer/company';
export const getCategoryRedux = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories`
    )
  };
};

export const addCategoryRedux = data => {
  return {
    type: 'ADD_CATEGORY',
    payload: axios.post(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories`,
      data
    )
  };
};

export const updateCategoryRedux = (id, data) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios.patch(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories/${id}`,
      data
    )
  };
};

export const deleteCategoryRedux = id => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories/${id}`
    )
  };
};
