import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:3000/api/users"; // ⬅️ Your actual backend base URL

  // Load stored user and token on refresh and merge them
  useEffect(() => {
    const storedUser = localStorage.getItem("skilllinker_user");
    const storedToken = localStorage.getItem("skilllinker_token"); // Get the separately stored token

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      // Merge the token into the user object before setting state
      setCurrentUser({ ...user, token: storedToken }); 
    }
    setIsLoading(false);
  }, []);

  // ⭐ LOGIN using your real API
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      const userWithToken = { ...user, token };

      // Save user (now including the token in the state object)
      setCurrentUser(userWithToken); 
      localStorage.setItem("skilllinker_user", JSON.stringify(user));
      localStorage.setItem("skilllinker_token", token);

      return { success: true, user: userWithToken };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Login failed",
      };
    }
  };


  // ⭐ REGISTER using your real API
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);

      const { user, token } = res.data;
      const userWithToken = { ...user, token };


      setCurrentUser(userWithToken);
      localStorage.setItem("skilllinker_user", JSON.stringify(user));
      localStorage.setItem("skilllinker_token", token);


      return { success: true, user: userWithToken };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // ⭐ LOGOUT
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("skilllinker_user");
    localStorage.removeItem("skilllinker_token"); // Also remove the token
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};