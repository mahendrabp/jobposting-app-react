import axios from 'axios';

export const login = data => ({
  type: 'LOGIN_USER',
  payload: new Promise((resolve, reject) => {
    axios
      .post('http://localhost:5200/api/v1/users/login', data)
      .then(({ data: result }) => resolve(result))
      .catch(({ response }) => reject(response));
  })
});

export const logout = () => ({
  type: 'LOGOUT_USER',
  payload: null
});
