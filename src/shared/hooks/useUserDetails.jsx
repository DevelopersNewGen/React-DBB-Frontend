import { useState, useEffect } from "react";
import { logout as logoutHandler } from "./useLogout"; 

const getUserDetails = () => {
    const userDetails = localStorage.getItem('user')

    if(userDetails){
        return JSON.parse(userDetails)
    }

    return null
}

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails())

    useEffect(() => {
        setUserDetails(getUserDetails())
    },[])

    const logout = () => {
        logoutHandler()
        setUserDetails(null)
    }

    return{
        isLogged: Boolean(userDetails),
        logout
    }
}