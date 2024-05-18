import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Ads"], 
  endpoints: (builder) => ({
    getAds: builder.query({
      query: () => "/ads", 
      providesTags: ["Ads"], 
    }),
    createAd: builder.mutation({
      query: (ad) => ({
        url: "/ads",
        method: "POST",
        body: ad,
      }),
      invalidatesTags: ["Ads"], 
    }),
    deleteAd: builder.mutation({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"], 
    }),
  }),
});

export const {
  useGetAdsQuery,
  useCreateAdMutation,
  useDeleteAdMutation,
} = apiSlice;
