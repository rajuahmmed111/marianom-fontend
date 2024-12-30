import { baseApi } from "@/redux/api/baseApi";

// New Member-related endpoints
export const newMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get new members
    getNewMember: builder.query({
      query: () => "/users/new-members",
      providesTags: ["NewMember"],
    }),
  }),
});

export const {
  useGetNewMemberQuery,
} = newMemberApi;
