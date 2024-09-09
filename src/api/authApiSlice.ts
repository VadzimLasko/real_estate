import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Users, User } from "@/types/users";
import { baseUrl } from "@/helpers";

export const authApiSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => "/users",
      providesTags: ["Auth"],
      keepUnusedDataFor: 5,
    }),
    getCurrentUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation<User, Partial<User>>({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateFavorites: builder.mutation<
      User,
      { id: string; favorites: string[] }
    >({
      query: ({ id, favorites }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { favorites: [...favorites] },
      }),
      invalidatesTags: ["Auth"],
    }),
    updateUser: builder.mutation<User, { id: string; user: User }>({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),

    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateFavoritesMutation,
  useGetCurrentUserQuery,
} = authApiSlice;
