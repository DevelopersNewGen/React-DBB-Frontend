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
        return await apiClient.get(`/users/getUser`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getUserById = async (uid) => {
    try {
        return await apiClient.get(`/users/findUser/${uid}`);
    } catch (e) {
        return { error: true, e };
    }
};
