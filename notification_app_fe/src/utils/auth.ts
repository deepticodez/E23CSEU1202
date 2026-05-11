import { TOKEN_KEY } from "./constants";

export const initializeAuth = (tokenFromParam?: string): string | null => {
  // Check if token is provided as parameter
  if (tokenFromParam) {
    localStorage.setItem(TOKEN_KEY, tokenFromParam.trim());
    return tokenFromParam.trim();
  }

  // Check if token already exists in localStorage
  const existingToken = localStorage.getItem(TOKEN_KEY);
  if (existingToken) {
    return existingToken;
  }

  // Try to get token from query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const queryToken = queryParams.get("token");
  if (queryToken) {
    localStorage.setItem(TOKEN_KEY, queryToken.trim());
    return queryToken.trim();
  }

  return null;
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    // Optionally handle missing token logic here without logging
  }
  return token;
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
