const accessKey = "accessID";

export const getItem = (): string | null => {
  try {
    return localStorage.getItem(accessKey);
  } catch (e) {
    console.error("Error getting data from localStorage", e);
    return null;
  }
};

export const setItem = (data: string): void => {
  try {
    localStorage.setItem(accessKey, data);
  } catch (e) {
    console.error("Error setting data from localStorage", e);
  }
};

export const deleteItem = (): void => {
  try {
    localStorage.removeItem(accessKey);
  } catch (e) {
    console.error("Error setting data from localStorage", e);
  }
};
