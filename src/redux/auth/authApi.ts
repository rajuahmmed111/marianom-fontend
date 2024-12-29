// import { baseApi } from "../api/baseApi";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // User Registration
//     registerUser: builder.mutation({
//       query: (userData) => ({
//         url: "/users/create",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["User"], 
//     }),

//     // User Login
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: "/users/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
