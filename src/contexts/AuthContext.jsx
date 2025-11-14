import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData'; // Make sure you have a mockData.js file exporting mockUsers array

// Create Auth context
const AuthContext = createContext();

// Custom hook to use Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored user on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('skilllinker_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email, password) => {
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') { // simple mock password
      setCurrentUser(user);
      localStorage.setItem('skilllinker_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Mock registration function
  const register = async (userData) => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      verified: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('skilllinker_user', JSON.stringify(newUser));
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skilllinker_user');
  };

  // Update user details
  const updateUser = (updatedUser) => {
    const index = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      mockUsers[index] = updatedUser;
      setCurrentUser(updatedUser);
      localStorage.setItem('skilllinker_user', JSON.stringify(updatedUser));
    }
  };

  // Context value
  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    isLoading,
    isAuthenticated: !!currentUser,
    allUsers: mockUsers, // expose all mock users for admin dashboard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
