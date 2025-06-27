import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/DBB/v1",
    timeout: 3000,
    httpsAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                }
            } catch (err) {
                console.warn("Error al leer el token:", err);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (emailOrUsername, password) => {
    try {
        return await apiClient.post('/auth/login', { emailOrUsername, password });
    } catch (e) {
        return { error: true, e };
    }
};

//User

export const getUser = async () => {
    try {
        return await apiClient.get(`/user/getUser`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getUserById = async (uid) => {
    try {
        return await apiClient.get(`/user/findUser/${uid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getUsers = async () => {
    try {
        return await apiClient.get('/user/');
    } catch (e) {
        return { error: true, e };
    }
};

export const createUser = async (userData) => {
    try {
        return await apiClient.post('/user/createUser', userData);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateUserAdmin = async (uid, data) => {
    try {
        return await apiClient.put(`/user/updateUserAdmin/${uid}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteUserAdmin = async (uid) => {
    try {
        return await apiClient.delete(`/user/deleteUserAdmin/${uid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateUser = async (data) => {
    try {
        return await apiClient.put('/user/updateUser', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateUserPassword = async (data) => {
    try {
        return await apiClient.patch('/user/updatePassword', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateRole = async (uid, newRole) => {
    try {
        return await apiClient.patch(`/user/updateRole/${uid}`, { newRole });
    } catch (e) {
        return { error: true, e };
    }
};

export const getUserFavorites = async () => {
  try {
    const res = await apiClient.get('/user/getUser');
    return { data: res.data.user.favs };
  } catch (e) {
    return { error: true, e };
  }
};

export const addFavoriteAccount = async ({ accountNumber, alias }) => {
  try {
    return await apiClient.patch('/user/favoriteAccount', { accountNumber, alias });
  } catch (e) {
    return { error: true, e };
  }
};
