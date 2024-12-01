// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register: user => {
        return fetch(`/user/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    login: user => {
        return fetch(`/user/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data); // We get the user data
            else
                return { isAuthenticated: false }
        })
    },
    logout: () => {
        return fetch(`/user/logout`)
            .then(res => res.json())
            .then(data => data);
    },
    delete: (_id) => {
        return fetch(`/user/${_id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data)
    },
    // Sync backend and front end
    isAuthenticated: () => {
        return fetch(`/user/c/authenticated`)
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: {} }
            });
    }
}