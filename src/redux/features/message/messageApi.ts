import baseApi from '@/redux/api/baseApi';

// const socketapi = "http://192.168.11.172:3018/api/v1/messages/channels";

export const MessageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChannel: builder.query({
            query: () => ({
                url: '/messages/channels',
                method: 'GET',
            }),
            providesTags: ['Message'],
        }),
        getSingleMessage: builder.query({
            query: (channelName) => ({
                url: `/messages/get-message/${channelName}`,
                method: 'GET',
            }),
            providesTags: ['Message'],
        }),
    }),
});

export const {
    useGetChannelQuery,
    useGetSingleMessageQuery,
    useLazyGetSingleMessageQuery
} = MessageApi;

