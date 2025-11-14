import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('skilllinker_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') { // Simple mock password
      setCurrentUser(user);
      localStorage.setItem('skilllinker_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // Mock registration - in real app, this would call an API
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      verified: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('skilllinker_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skilllinker_user');
  };

  const updateUser = (updatedUser) => {
    const index = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      mockUsers[index] = updatedUser;
      setCurrentUser(updatedUser);
      localStorage.setItem('skilllinker_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    isLoading,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
