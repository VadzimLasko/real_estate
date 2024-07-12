import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ad, Ads } from "@/types/ads";
import { baseUrl } from "@/helpers";

export const adApiSlice = createApi({
  reducerPath: "apiAd",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Ads"],
  endpoints: (builder) => ({
    getAds: builder.query<Ads, void>({
      query: () => "/ads",
      providesTags: ["Ads"],
      keepUnusedDataFor: 5,
    }),
    getOneAd: builder.query<Ad, string>({
      query: (id) => `/ads/${id}`,
      // providesTags: ["Ads"],
      keepUnusedDataFor: 5,
    }),
    createAd: builder.mutation<Ad, Ad>({
      query: (ad) => ({
        url: "/ads",
        method: "POST",
        body: ad,
      }),
      invalidatesTags: ["Ads"],
    }),
    updateAd: builder.mutation<Ad, { id: string; ad: Ad }>({
      query: ({ id, ad }) => ({
        url: `/ads/${id}`,
        method: "PUT",
        body: ad,
      }),
      invalidatesTags: ["Ads"],
    }),
    deleteAd: builder.mutation<{ success: boolean }, string>({
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
