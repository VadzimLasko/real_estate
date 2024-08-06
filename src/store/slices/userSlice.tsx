import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { authApiSlice } from "@/api/authApiSlice";
import { currentUserFromId } from "@/helpers";
import { getItem, deleteItem } from "@/helpers/persistanceStorage";
import { CurrentUser, Users, CurrentUserState } from "@/types/users";

const userAdapter = createEntityAdapter<CurrentUser>();
//TODO может не нужет здесь энтити адаптер
const initialState: CurrentUserState = userAdapter.getInitialState({
  currentUser: null,
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeCurrentUser(state) {
      deleteItem();
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.getUsers.matchFulfilled,
        (state, action: PayloadAction<Users>) => {
          const accessID = getItem();

          if (accessID) {
            const currentUser = currentUserFromId(action.payload, accessID);
            if (currentUser) {
              const { id, email, favorites } = currentUser;
              state.currentUser = { id, email, favorites };
            }
          }
        }
      )
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = userSlice;

export const { removeCurrentUser } = actions;

export default reducer;
