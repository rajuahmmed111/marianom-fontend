import baseApi from '@/redux/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (data) => {
        console.log(15, data);
        return {
          url: '/users/create',
          method: 'POST',
          body: data,
        };
      },
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    verifyOtp: builder.mutation({
      query: (data: { hexCode: string; otp: string }) => ({
        url: '/auth/otp-enter',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        // body: data,
      }),
    }),
  
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/users/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),


    getProfile: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateProfileImage: builder.mutation({
      query: ({id, data}) => ({
        url: `/users/profile-img-update/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User'],
    }),
    getPhotoByUser: builder.query({
      query: (id) => ({
        url: `/post/user/photos/${id}`,
        method: 'GET'
      })
    })


    
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileImageMutation,
  useGetPhotoByUserQuery
} = authApi;
