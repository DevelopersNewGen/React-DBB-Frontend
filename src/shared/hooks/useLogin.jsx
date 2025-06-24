import { login as loginRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    
    const login = async (emailOrUsername, password) => {

        setIsLoading(true);

        const response = await loginRequest(emailOrUsername, password);

        setIsLoading(false);

        if(response.error){
            toast.error(response.e?.response?.data?.message || "Error iniciar sesión")
            return;
        }else{
            toast.success(response.data.message || "Inicio de sesión exitoso")
        }


        const userDetails = response.data?.userDetails || {};


        const { id, uid, _id, ...userDetailsSinId } = userDetails;
        localStorage.setItem('user', JSON.stringify(userDetailsSinId));
        navigate("/");
        window.location.reload();
        

    }

    return{
        login,
        isLoading
    }
}