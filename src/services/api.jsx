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

export const updateDepositAmount = async (movementId, updateData) => {
  try {
    const res = await apiClient.patch(`/movement/deposit/${movementId}`, updateData);
    return res;
  } catch (e) {
    console.error("Error updating deposit:", e);
    return { error: true, message: e.response ? e.response.data.msg : e.message };
  }
};

export const revertDepositAmount = async (movementId) => {
  try {
    const res = await apiClient.delete(`/movement/deposit/${movementId}`);
    return res;
  } catch (e) {
    console.error("Error reverting deposit:", e);
    return { error: true, message: e.response ? e.response.data.msg : e.message };
  }
};

export const makeWithdrawal = async (withdrawalData) => {
  try {
    return await apiClient.post("/movement/withdrawal", withdrawalData);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAccountMovements = async (aid, from = 0, limit = 10) => {
  try {
    return await apiClient.get(`/movement/account/${aid}?from=${from}&limit=${limit}`);
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

export const getMyRecentMovements = async (accountNumber) => {
  try {
    return await apiClient.get(`/movement/recent/${accountNumber}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAllMovements = async (page = 0, rowsPerPage = 10,) => {
  try {
    const from = page * rowsPerPage;
    const limit = rowsPerPage;
    return await apiClient.get(`/movement?from=${from}&limit=${limit}`);
  } catch (e) {
    return { error: true, e };
  }
}

export const getUserMovements = async (page = 0, rowsPerPage = 10) => {
  try {
    const from = page * rowsPerPage;
    const limit = rowsPerPage;
    return await apiClient.get(`/movement/user?from=${from}&limit=${limit}`);
  } catch (e) {
    return { error: true, e };
  }
}
