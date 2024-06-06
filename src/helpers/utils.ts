export const isCoincidence = (arr, key: string, value: string) => {
  return arr.some((ar) => ar[key] === value);
};

export const currentUserFromEmail = (arr, email: string) => {
  const user = arr.find((user) => user.email === email);
  console.log("user", user);
  return user;
};

export const currentUserFromId = (arr, id) => {
  const user = arr.find((user) => user.id === id);
  return user;
};
