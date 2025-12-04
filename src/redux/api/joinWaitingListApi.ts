import { baseApi } from "./baseApi";

const WaitingList_URL = "/join-waiting";

const joinWaitingListApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeWaitingList: build.mutation({
      query: (waitingListData) => ({
        url: `${WaitingList_URL}`,
        method: "POST",
        data: waitingListData,
        // body: userData,
      }),
      invalidatesTags: ["waiting-list"],
    }),

    getWaitingListByUser: build.query({
      query: (arg) => ({
        url: `${WaitingList_URL}/by-user`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["waiting-list"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetWaitingListByUserQuery, usePlaceWaitingListMutation } =
  joinWaitingListApi;
