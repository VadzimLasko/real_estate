import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApiSlice } from "@/api/authApiSlice";
import { currentUserFromId } from "@/helpers";
import { getItem, deleteItem } from "@/helpers/persistanceStorage";
import { Users, CurrentUserState } from "@/types/users";

const initialState: CurrentUserState = {
  currentUser: null,
};

const userCleanup = (state: CurrentUserState) => {
  deleteItem();
  state.currentUser = null;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeCurrentUser(state) {
      userCleanup(state);
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
      .addMatcher(authApiSlice.endpoints.deleteUser.matchFulfilled, (state) => {
        userCleanup(state);
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = userSlice;

export const { removeCurrentUser } = actions;

export default reducer;
