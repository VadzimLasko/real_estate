import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { authApiSlice } from "@/api/authApiSlice";
import { currentUserFromId } from "@/helpers";
import { getItem } from "@/helpers/persistanceStorage";
import { CurrentUser, Users, CurrentUserState } from "@/types/users";

const userAdapter = createEntityAdapter<CurrentUser>();

const initialState: CurrentUserState = userAdapter.getInitialState({
  currentUser: null,
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.getUsers.matchFulfilled,
        (state, action: PayloadAction<Users>) => {
          const accessID = getItem();

          if (accessID) {
            const currentUser = currentUserFromId(action.payload, accessID);
            if (currentUser) {
              const { id, email } = currentUser;
              state.currentUser = { id, email };
            }
          }
        }
      )
      .addDefaultCase(() => {});
  },
});

const { reducer } = userSlice;
export default reducer;
