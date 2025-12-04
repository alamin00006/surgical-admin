import { baseApi } from "./baseApi";

const MARKET_URL = "/market-banner";

const marketBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMarketBanners: build.query({
      query: () => {
        return {
          url: MARKET_URL,
          method: "GET",
        };
      },
      providesTags: ["marketBanner"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllMarketBannersQuery } = marketBannerApi;
