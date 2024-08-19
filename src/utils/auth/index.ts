export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem("authToken", token);
};
