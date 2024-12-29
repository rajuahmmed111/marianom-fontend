import baseApi from '@/redux/api/baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        commentPostApi: builder.mutation({
            query: ({id, content}:{id: string, content: string}) => ({
                url: `/comments/${id}`,
                method: 'POST',
                body: {content},
            }),
            invalidatesTags: ['Comments'],
        }),



    }),
});

export const {
    useCommentPostApiMutation,


} = authApi;
