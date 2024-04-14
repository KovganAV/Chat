export const getSessionFromStorage = () => localStorage.getItem("token");

export const removeSessionFromStorage = () => localStorage.removeItem("token");

export const addSessionToStorage = (token: string) =>
  localStorage.setItem("token", token);
