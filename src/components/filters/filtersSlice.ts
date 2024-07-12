import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: number[] | null;
  rooms: number[] | null;
  squareRange: number[] | null;
  floor: number[] | null;
  filterLoadingStatus: boolean;
}

const initialState: FilterState = {
  priceRange: null,
  rooms: null,
  squareRange: null,
  floor: null,
  filterLoadingStatus: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChanged: (
      state,
      action: PayloadAction<{ key: keyof typeof state; value: any }>
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        (state[key] as any) = value;
      }
    },
  },
});

const { reducer, actions } = filterSlice;

export const { filterChanged } = actions;
Fil;
A;

export default reducer;
