// C:\Users\Thabiso\skilllinker-frontend\src\contexts\AdminContext.jsx
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const getToken = () => localStorage.getItem("skilllinker_token");

export const getUsersAPI = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data; // returns array of users
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

export const updateUserAPI = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data; // returns updated user
  } catch (err) {
    console.error("Error updating user:", err);
    return null;
  }
};
