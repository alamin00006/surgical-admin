import { baseApi } from "./baseApi";

const TRANSACTION_URL = "/transaction";

const bankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query({
      query: (arg) => ({
        url: `${TRANSACTION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["transaction"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTransactionsQuery } = bankApi;
