import { axiosClient } from "./AxiosService";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register: (user) => {
        return axiosClient.post(`/user/register`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },
    login: (user) => {
        return axiosClient.post(`/user/login`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.data)
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    return { isAuthenticated: false };
                }
                console.error(err);
                throw err;
            });
    },
    logout: () => {
        return axiosClient.get(`/user/logout`)
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },
    delete: (_id) => {
        return axiosClient.delete(`/user/${_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },
    isAuthenticated: () => {
        return axiosClient.get(`/user/c/authenticated`)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    return { isAuthenticated: false, user: {} };
                }
                console.error(err);
                throw err;
            });
    }
};
