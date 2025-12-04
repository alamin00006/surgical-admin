import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notifications";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationByUserId: build.query({
      query: (arg) => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["notifications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationByUserIdQuery } = notificationApi;
