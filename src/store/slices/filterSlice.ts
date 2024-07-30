import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: number[] | null;
  rooms: string[];
  squareRange: number[] | null;
  floor: string[] | null;
}

const initialState: FilterState = {
  priceRange: null,
  rooms: [],
  squareRange: null,
  floor: null,
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

export default reducer;
