import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  
  // ✅ Resume State
  const [resume, setResume] = useState(null); 
  const [loadingResume, setLoadingResume] = useState(false);

  // Set the base API URL
  const API_URL = "http://localhost:3000/api"; 

  // --- Initialization and User Loading ---
  useEffect(() => {
    const storedUser = localStorage.getItem("skilllinker_user");
    const storedToken = localStorage.getItem("skilllinker_token");

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      setCurrentUser({ ...user, token: storedToken });
    }
    setIsLoading(false);
  }, []);

  // --- Authentication Functions ---

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      const { user, token } = res.data;
      const userWithToken = { ...user, token };

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


  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/users/register`, userData);

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

  const logout = () => {
    setCurrentUser(null);
    setResume(null); // Clear resume state on logout
    localStorage.removeItem("skilllinker_user");
    localStorage.removeItem("skilllinker_token"); 
  };


  // --- Resume Management Functions (New/Moved Logic) ---

  const fetchResume = useCallback(async () => {
    if (!currentUser?.token || !currentUser?.id) return;
    setLoadingResume(true);
    try {
        // Fetching resume data, assuming backend handles the user ID from auth/path
        const res = await axios.get(`${API_URL}/resumes/${currentUser.id}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
            // responseType: 'blob', // Use if you need the actual file blob
        });
        
        // Assuming the response contains resume metadata (e.g., filename, id)
        // Adjust based on your backend return structure (e.g., res.data.filename)
        if (res.data.filename) {
             setResume({ name: res.data.filename, id: res.data.id });
        } else {
             setResume(null); // No resume found
        }
       
    } catch (err) {
        // 404 is common if no resume exists; handle silently
        if (err.response?.status === 404) {
            setResume(null);
        } else {
            console.error('Error fetching resume:', err);
        }
    } finally {
        setLoadingResume(false);
    }
  }, [currentUser?.token, currentUser?.id]);


  const uploadResume = useCallback(async (file) => {
    if (!currentUser?.token || !currentUser?.id) return { success: false, error: 'User not logged in' };

    const formData = new FormData();
    // 'resume' is the field name expected by the multer middleware in the backend
    formData.append('resume', file);
    formData.append('userId', currentUser.id); // Assuming backend uses this for linkage

    setLoadingResume(true);
    try {
      const res = await axios.post(`${API_URL}/resumes`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update local state with the uploaded file info
      setResume({ name: file.name, id: res.data.resume.id }); 
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Error uploading resume:', err);
      return { success: false, error: err.response?.data?.message || err.message };
    } finally {
      setLoadingResume(false);
    }
  }, [currentUser?.token, currentUser?.id]);


  // --- Resume Effect ---
  // Load resume when user logs in/page refreshes
  useEffect(() => {
    if (currentUser?.token) {
        fetchResume(); 
    }
  }, [currentUser?.token, fetchResume]);


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        isLoading,
        // ✅ Resume Management props
        resume,
        uploadResume,
        loadingResume,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};