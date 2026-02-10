import axios from "axios";
import { useState, useEffect } from "react";
const CheckAuthentication = () => {
   const [auth, setAuth] = useState(false);
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
   
    if (!accessToken) {
       setAuth(false);
      return;
    }
    axios
      .post(`${backend_url}/auth/jwt/verify`, { token: accessToken })
      .then((response) => {
        if (response.status === 200) {
           setAuth(true);
        } else {
           setAuth(false);
        }
      })
      .catch((error) => {
        setAuth(false);
      })
      .finally(() => {
         console.log("[AuthCheck] Authentication check completed. Auth state set to:", auth);});
  }, []);
  console.log("[AuthCheck] Returning auth state:", auth);
  return auth;
};
export default CheckAuthentication;