/* This attaches the user’s JWT token (if saved in localStorage or sessionStorage) to the request headers 
so that protected API routes can verify the user’s identity. */

/* It's axios instance, a customized axios version where you set your base URL, headers, and interceptors once, instead of repeating them in every request. 
but for this project we don't use it.*/

export const authFetch = async (url, options = {}) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token"); // Checks if there’s a token in localStorage first. If not found there, it checks sessionStorage.
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(url, { ...options, headers });
  return res;
};
