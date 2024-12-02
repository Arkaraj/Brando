import { axiosClient, throwDataOnError } from './AxiosService';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register: (user) => {
    return axiosClient
      .post('/user/register', user)
      .then((response) => response.data);
  },
  login: (user) => {
    return axiosClient
      .post('/user/login', user)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return { isAuthenticated: false };
        }
        return error.response.data;
      });
  },
  logout: () => {
    return axiosClient
      .post('/user/logout')
      .then((response) => response.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },
  delete: (_id) => {
    return axiosClient
      .delete(`/user/${_id}`)
      .then((response) => response.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },
  isAuthenticated: () => {
    return axiosClient
      .get('/user/c/authenticated')
      .then((response) => response.data)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return { isAuthenticated: false, user: {} };
        }
        return error.response.data;
      });
  },
};
