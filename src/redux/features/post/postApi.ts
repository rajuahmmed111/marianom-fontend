import baseApi from '@/redux/api/baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        postApi: builder.mutation({
            query: (credentials) => ({
                url: '/post',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Post'],
        }),

        getPost: builder.query({
            query: () => ({
                url: '/post',
                method: "GET",
            }),
            providesTags: ['Post']
        }),
        postFavourite: builder.mutation({
            query: (id) => ({
                url: `/favorite/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['Post']
        }),
        getFavourite: builder.query({
            query: (id) => ({
                url: `/favorite/${id}`,
                method: "GET",
            }),
            providesTags: ['Post']
        })




    }),
});

export const {
    usePostApiMutation,
    useGetPostQuery,
    usePostFavouriteMutation,
    useGetFavouriteQuery,

} = authApi;
