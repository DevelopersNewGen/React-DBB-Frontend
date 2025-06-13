import React, {useState} from "react"
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import "./authPage.css"

import { Login } from "../../components/auth/Login"
import { useUser } from "../../shared/hooks";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {role}= useUser();

  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <ResponsiveAppBar role={role}/>
      <div className="auth-background">
        <div className="auth-container">
          <Login switchAuthHandler={handleAuthPageToggle} />
        </div>
      </div>
    </>
  );
};