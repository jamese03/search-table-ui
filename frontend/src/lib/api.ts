import axios from 'axios';
const API_BASE_URL = "http://localhost:3000"
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});
// Check if the user is authenticated
export const checkAuth = async (): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
    });
    return response.ok;
};

// Login user by redirecting to Google OAuth
export const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
};

// Logout user
export const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
};

export default api;