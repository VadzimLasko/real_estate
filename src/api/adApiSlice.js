import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adApiSlice = createApi({
  reducerPath: "apiAd",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Ads"],
  endpoints: (builder) => ({
    getAds: builder.query({
      query: () => "/ads",
      providesTags: ["Ads"],
      keepUnusedDataFor: 5,
    }),
    getOneAd: builder.query({
      query: (id) => `/ads/${id}`,
      // providesTags: ["Ads"],
      keepUnusedDataFor: 5,
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
  useGetOneAdQuery,
  useCreateAdMutation,
  useDeleteAdMutation,
} = adApiSlice;
