import axios from 'axios';

export const login = data => ({
  type: 'LOGIN_USER',
  payload: axios.post(
    'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/users/login',
    data
  )
});

export const logout = () => ({
  type: 'LOGOUT_USER',
  payload: null
});
