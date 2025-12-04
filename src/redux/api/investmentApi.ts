import { baseApi } from "./baseApi";

const INVESTMENT_URL = "/investment";

const investmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeInvestment: build.mutation({
      query: (investmentData) => ({
        url: `${INVESTMENT_URL}`,
        method: "POST",
        data: investmentData,
        // body: userData,
      }),
      invalidatesTags: ["investments"],
    }),
    getSingleInvestmentByUserORInvestId: build.query({
      query: (arg) => ({
        url: `${INVESTMENT_URL}/single-investment`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["investments"],
    }),

    getAllInvestByUserId: build.query({
      query: (arg) => ({
        url: `${INVESTMENT_URL}/all`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["investments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePlaceInvestmentMutation,
  useGetSingleInvestmentByUserORInvestIdQuery,
  useGetAllInvestByUserIdQuery,
} = investmentApi;
