export const getFromStorage = (value) => {
  const state = localStorage.getItem(value);
  return state;
};

export const storeInLocal = (string, value) => {
  localStorage.setItem(string, value);
};
