import baseApi from '@/redux/api/baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        commentPostApi: builder.mutation({
            query: ({id, body}) => ({
                url: `/comments/${id}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Comments'],
        }),



    }),
});

export const {
    useCommentPostApiMutation,


} = authApi;
