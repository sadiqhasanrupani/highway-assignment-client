export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem("authToken", token);
};

export const removeAuthToken = () => {
  return localStorage.removeItem("authToken");
};
