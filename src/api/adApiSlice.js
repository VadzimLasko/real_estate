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
    updateAd: builder.mutation({
      query: ({ id, ad }) => ({
        url: `/ads/${id}`,
        method: "PUT",
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
  useUpdateAdMutation,
  useDeleteAdMutation,
} = adApiSlice;

// const oneAd = {
//   id: "KECSPPJEwiEQ5F05SA3yV",
//   title: "Mr.",
//   address: "full street address",
//   photos: "",
//   price: 12,
//   description: "this is a comment",
//   square: 12,
//   rooms: 2,
//   floor: 2,
//   name: "my full name",
//   phone: 375444546589,
//   author: "2me@mydomain.com",
//   coordinates: "",
// };
