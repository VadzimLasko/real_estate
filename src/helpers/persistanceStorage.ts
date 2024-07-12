const accessKey = "accessID";

export const getItem = (): string | null => {
  try {
    return localStorage.getItem(accessKey);
  } catch (e) {
    console.log("Error getting data from localStorage", e);
    return null;
  }
};

export const setItem = (data: string): void => {
  try {
    localStorage.setItem(accessKey, data);
  } catch (e) {
    console.log("Error setting data from localStorage", e);
  }
};
