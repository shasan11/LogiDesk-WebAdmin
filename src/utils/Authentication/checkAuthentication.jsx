import axios from "axios";
import { useState, useEffect } from "react";

const CheckAuthentication = () => {
  const [auth, setAuth] = useState(false);
  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setAuth(false);
      return;
    }

    axios
      .post(`${backendUrl}/auth/jwt/verify/`, { token: accessToken })
      .then(({ status }) => {
        setAuth(status === 200);
      })
      .catch(() => {
        setAuth(false);
      });
  }, [accessToken, backendUrl]);

  return auth;
};

export default CheckAuthentication;
