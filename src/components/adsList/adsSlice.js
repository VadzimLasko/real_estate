import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const adsAdapter = createEntityAdapter();

const initialState = adsAdapter.getInitialState({
  adsLoadingStatus: "idle",
});

export const fetchAds = createAsyncThunk("ads/fetchAds", () => {
  const { request } = useHttp();

  return request("http://localhost:3001/ads");
});

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    adCreated: (state, action) => {
      adsAdapter.addOne(state, action.payload);
    },
    adDeleted: (state, action) => {
      adsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.adsLoadingStatus = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        adsAdapter.setAll(state, action.payload);
        state.adsLoadingStatus = "idle";
      })
      .addCase(fetchAds.rejected, (state) => {
        state.adsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = adsSlice;

export default reducer;

export const { selectAll } = adsAdapter.getSelectors((state) => state.ads);
console.log(selectAll);
export const filteredAdsSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, ads) => {
    if (filter === "all") {
      return ads;
    } else {
      return ads.filter((item) => item.element === filter);
    }
  }
);

export const { adCreated, adDeleted } = actions;
