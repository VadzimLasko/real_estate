import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  usersLoadingStatus: "idle",
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  const { request } = useHttp();

  return request("http://localhost:3001/users");
});

const usersSlice = createSlice({
  name: "users", // Слайс - это срез. Первый аргумент нейм это имя среза, должно совпадать именем в стейте типа: state.heroes
  initialState,
  reducers: {
    adCreated: (state, action) => {
      usersAdapter.addOne(state, action.payload);
    },
    adDeleted: (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadingStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.usersLoadingStatus = "idle";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = usersSlice;

export default reducer;

export const { selectAll } = usersAdapter.getSelectors((state) => state.users);

export const filteredUsersSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, users) => {
    if (filter === "all") {
      return users;
    } else {
      /////////////////////////////////Элемент снизу
      return users.filter((item) => item.element === filter);
    }
  }
);

export const {
  usersFetching,
  usersFetched,
  usersFetchingError,
  userCreated,
  userDeleted,
} = actions;
