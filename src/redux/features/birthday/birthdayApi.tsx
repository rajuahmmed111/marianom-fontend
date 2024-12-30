import baseApi from "@/redux/api/baseApi";

// Birthday-related endpoints
export const birthdayApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getTodaysBirthdays: builder.query({
        query: () => "/birthday/todays-birthdays",
        providesTags: ["Birthday"],
      }),
  
      // Post birthday wish
      postBirthdayWish: builder.mutation({
        query: (data) => ({
          url: "/birthday",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Birthday"],
      }),
    }),
  });
  
  export const {
    useGetTodaysBirthdaysQuery,
    usePostBirthdayWishMutation,
  } = birthdayApi;
  