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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   tagTypes: ["Auth"],
//   endpoints: (builder) => ({
//     addToFavorites: builder.mutation<User, { idUser: string; item: string }>({
//       query: ({ idUser, item }) => ({
//         url: `/users/${idUser}/favorites`,
//         method: "PATCH",
//         body: { action: "add", item },
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     removeFromFavorites: builder.mutation<
//       User,
//       { idUser: string; item: string }
//     >({
//       query: ({ idUser, item }) => ({
//         url: `/users/${idUser}/favorites`,
//         method: "PATCH",
//         body: { action: "remove", item },
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//   }),
// });

// export const { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } =
//   api;
//   const express = require('express');
//   const fs = require('fs');
//   const bodyParser = require('body-parser');
//   const app = express();

//   app.use(bodyParser.json());

//   const filePath = 'path_to_your_json_file.json';

//   app.patch('/api/users/:id/favorites', (req, res) => {
//     const userId = req.params.id;
//     const { action, item } = req.body;

//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) return res.status(500).send('Server Error');
//       let jsonData = JSON.parse(data);
//       let user = jsonData.users.find(user => user.id === userId);

//       if (!user) return res.status(404).send('User not found');

//       if (action === 'add' && !user.favorites.includes(item)) {
//         user.favorites.push(item);
//       } else if (action === 'remove') {
//         user.favorites = user.favorites.filter(favItem => favItem !== item);
//       } else {
//         return res.status(400).send('Invalid action or item already exists');
//       }

//       fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), 'utf8', err => {
//         if (err) return res.status(500).send('Server Error');
//         res.status(200).send(user);
//       });
//     });
//   });

//   const PORT = 3000;

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
