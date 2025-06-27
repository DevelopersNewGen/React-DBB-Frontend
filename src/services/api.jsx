import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/DBB/v1",
  timeout: 3000,
  httpsAgent: false,
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

//Account

export const getAccountsByUser = async (userId) => {
  try {
    return await apiClient.get(`/accounts/user/${userId}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAccounts = async () => {
  try {
    return await apiClient.get("/accounts/listAccounts");
  } catch (e) {
    return { error: true, e };
  }
};

export const createAccount = async (userId, accountData) => {
  try {
    return await apiClient.post(`/accounts/createAccount/${userId}`, accountData);
  } catch (e) {
    throw e;
  }
};

//Movements

export const makeDeposit = async (depositData) => {
  try {
    return await apiClient.post("/movement/deposit", depositData);
  } catch (e) {
    return { error: true, e };
  }
};

export const updateDepositAmount = async (mid, updateData) => {
  try {
    return await apiClient.patch(`/movement/deposit/${mid}`, updateData);
  } catch (e) {
    return { error: true, e };
  }
};

export const revertDepositAmount = async (mid, revertData) => {
  try {
    return await apiClient.delete(`/movement/deposit/${mid}`, { data: revertData });
  } catch (e) {
    return { error: true, e };
  }
};

export const makeWithdrawal = async (withdrawalData) => {
  try {
    return await apiClient.post("/movement/withdrawal", withdrawalData);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAccountMovements = async (aid) => {
  try {
    return await apiClient.get(`/movement/account/${aid}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getTopMovements = async () => {
  try {
    return await apiClient.get("/movement/top");
  } catch (e) {
    return { error: true, e };
  }
};

export const makeTransfer = async (originAccount, transferData) => {
  try {
    return await apiClient.post(`/movement/transfer/${originAccount}`, transferData);
  } catch (e) {
    return { error: true, e };
  }
};

export const getMyRecentMovements = async (aid) => {
  try {
    return await apiClient.get(`/movement/recent/${aid}`);
  } catch (e) {
    return { error: true, e };
  }
};