import { useEffect } from "react";
import { Navigate } from "react-router-dom"

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    localStorage.removeItem("userPreferences")

  }, [])
  
  return <Navigate to="/dashboard" />;
}

export default Logout;