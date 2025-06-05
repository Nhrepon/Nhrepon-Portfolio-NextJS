'user-server'

// Cookie utilities for client-side authentication
const COOKIE_NAME = 'token';

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${COOKIE_NAME}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 days
  document.cookie = `${COOKIE_NAME}=${token};expires=${expires.toUTCString()};path=/;secure;SameSite=Strict`;
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const isAuthenticated = () => {
  return !!getToken();
}; 