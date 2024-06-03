import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { authApiSlice } from "@/api/authApiSlice.js";
import { adApiSlice } from "@/api/adApiSlice.js";
import { isCoincidence, getItem, currentUserFromId } from "@/utils/utils.js";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  currentUser: null,
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // userCreated: (state, action) => {
    //   userAdapter.addOne(state, action.payload);
    // },
    // userDeleted: (state, action) => {
    //   userAdapter.removeOne(state, action.payload);
    // },
  },
  //Здесь АсинкСанк рассматривиается как внешний рэдюсер
  extraReducers: (builder) => {
    //Здесь АсинкСанк рассматривиается как внешний рэдюсер
    builder
      .addMatcher(
        authApiSlice.endpoints.getUsers.matchFulfilled,
        (state, action) => {
          const accessID = getItem("accessID");

          if (accessID) {
            const { id, email } = currentUserFromId(action.payload, accessID);
            state.currentUser = { id, email };
          }
        }
      )
      // .addMatcher(
      //   adApiSlice.endpoints.getOneAd.matchFulfilled,
      //   (state, action) => {
      //     const accessID = getItem("accessID");

      //     if (accessID) {
      //       const { id, email, ...currentUser } = currentUserFromId(
      //         action.payload,
      //         accessID
      //       );
      //       state.currentUser = { id, email };
      //     }
      //   }
      // )
      .addDefaultCase(() => {});
  },
});

const {
  // actions,
  reducer,
} = userSlice;
export default reducer;

// const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

// export const filteredHeroesSelector = createSelector(
//   //Эта хрень нужна для работы сразу с двумя частями стора и их подготовки, можно обойтись и без нее
//   (state) => state.filters.activeFilter,
//   selectAll,
//   (filter, heroes) => {
//     if (filter === "all") {
//       return heroes;
//     } else {
//       return heroes.filter((item) => item.element === filter);
//     }
//   }
// );

// export const { heroCreated, heroDeleted } = actions;
