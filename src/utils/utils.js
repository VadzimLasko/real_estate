export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log("Error getting data from localStorage", e);
    return null;
  }
};

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    console.log("Error setting data from localStorage", e);
  }
};

export const isCoincidence = (arr, key, value) => {
  return arr.some((ar) => ar[key] === value);
};

export const currentUserFromEmail = (arr, email) => {
  const user = arr.find((user) => user.email === email);
  console.log("user", user);
  return user;
};

export const currentUserFromId = (arr, id) => {
  const user = arr.find((user) => user.id === id);
  return user;
};
