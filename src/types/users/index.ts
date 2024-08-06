export interface CurrentUser {
  id: string;
  email: string;
  favorites: Array<string>;
}

// TODO потом убери вопросики из ключей

export interface User {
  id: string;
  email: string;
  password: string;
  confirm: never;
  gender: string;
  agreement: boolean;
  favorites: Array<string>;
}

export type Users = Array<User>;

export interface CurrentUserState {
  currentUser: CurrentUser | null;
}
