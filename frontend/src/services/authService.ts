import { apiRequest } from './api';

export interface User {
  _id: string;
  email: string;
  name: string;
  // Add other user fields as needed
}

export const signUp = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return apiRequest<{ user: User; token: string }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const signIn = async (credentials: { email: string; password: string }) => {
  return apiRequest<{ user: User; token: string }>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const getCurrentUser = async () => {
  return apiRequest<{ user: User }>('/users/me');
};

export const signOut = () => {
  localStorage.removeItem('token');
  // Optionally call a backend endpoint to invalidate the token
  window.location.href = '/';
};

// Add this to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
