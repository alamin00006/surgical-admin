import { baseApi } from "./baseApi";

const PRODUCT_URL = "/products";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: (arg) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params: arg,
        pollingInterval: 5000,
      }),
      providesTags: ["product"],
    }),
    getProductsById: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProductsQuery, useGetProductsByIdQuery } = productApi;
