import { baseApi } from "./baseApi";

const BANK_URL = "/bank-account";

const bankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBankAccountByUserId: build.query({
      query: (arg) => ({
        url: `${BANK_URL}/user-bank`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["bank"],
    }),

    getCompanyBankByCompany: build.query({
      query: (arg) => ({
        url: `/company-bank`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["bank"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBankAccountByUserIdQuery,
  useGetCompanyBankByCompanyQuery,
} = bankApi;
