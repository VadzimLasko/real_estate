import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Auth"], 
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users", 
      providesTags: ["Auth"],
      keepUnusedDataFor: 5,
      // transformResponse: (response, meta, arg) => {
      //   return response
      // },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"], 
    }),
    getCurrentUser: builder.query({
      query: (credentials) => ({
        url: '/users',
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"], 
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApiSlice;
