// src/utils/localStorage.js
import { mockUsers, mockJobs, mockMessages } from '../data/mockData.js';

// Keys for localStorage
const USERS_KEY = 'skilllinker_users';
const JOBS_KEY = 'skilllinker_jobs';
const MESSAGES_KEY = 'skilllinker_messages';
const CURRENT_USER_KEY = 'skilllinker_current_user';

// Initialize localStorage with mock data if not present
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(JOBS_KEY)) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(mockJobs));
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(mockMessages));
  }
};

// User functions
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const updateUser = (id, updatedUser) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    saveUsers(users);
    return users[index];
  }
  return null;
};

export const activateUser = (id) => {
  return updateUser(id, { active: true });
};

export const deactivateUser = (id) => {
  return updateUser(id, { active: false });
};

// Job functions
export const getJobs = () => {
  return JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
};

export const saveJobs = (jobs) => {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
};

export const addJob = (job) => {
  const jobs = getJobs();
  const newJob = { ...job, id: Date.now() }; // Simple ID generation
  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
};

export const getJobsForActiveAssessors = () => {
  const jobs = getJobs();
  const users = getUsers();
  const activeAssessors = users.filter(user => user.userType === 'assessor' && user.active);
  // Return open jobs only if there are active assessors
  return activeAssessors.length > 0 ? jobs.filter(job => job.status === 'open') : [];
};

// Message functions
export const getMessages = () => {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
};

export const saveMessages = (messages) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const addMessage = (message) => {
  const messages = getMessages();
  const newMessage = { ...message, id: Date.now(), timestamp: new Date().toISOString() };
  messages.push(newMessage);
  saveMessages(messages);
  return newMessage;
};

// Current user functions
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
