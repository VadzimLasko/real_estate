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
    }),
    getOneAd: builder.query<Ad, string>({
      query: (id) => `/ads/${id}`,
      keepUnusedDataFor: 0,
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
