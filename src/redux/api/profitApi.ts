import { baseApi } from "./baseApi";

const PROFIT_URL = "/profit-count";

const profitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfitsByUserId: build.query({
      query: (arg) => ({
        url: `${PROFIT_URL}/user-profits`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["profits"],
    }),
    getProfitsByInvestmentId: build.query({
      query: (userId) => ({
        url: `${PROFIT_URL}/${userId}/investment`,
        method: "GET",
      }),
      providesTags: ["profits"],
    }),

    getProfitsByProjectId: build.query({
      query: (arg) => ({
        url: `${PROFIT_URL}/project-profits`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["profits"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfitsByUserIdQuery,
  useGetProfitsByProjectIdQuery,
  useGetProfitsByInvestmentIdQuery,
} = profitApi;
