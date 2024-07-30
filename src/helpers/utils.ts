import { Users, User } from "@/types/users";

export const isCoincidence = (
  arr: Users,
  key: keyof User,
  value: string
): boolean => {
  return arr.some((user: User) => user[key] === value);
};

export const currentUserFromEmail = (
  arr: Users,
  email: string
): User | undefined => {
  return arr.find((user: User) => user.email === email);
};

export const currentUserFromId = (arr: Users, id: string): User | null => {
  const user = arr.find((user: User) => user.id === id);
  return user ? user : null;
};

export const firstLetterBig = (word: string): string => {
  return word[0].toUpperCase().concat(word.slice(1));
};
