import { baseApi } from "./baseApi";

const AUTH_URL = "/users";
const VERIFY_URL = "/user-verify";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: ["user"],
    }),
    userSignUp: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: ["user"],
    }),

    getUser: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/me`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getAllUser: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/count`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    sendOtp: build.mutation({
      query: (phoneNumber) => ({
        url: `${VERIFY_URL}/send-otp`,
        method: "POST",
        data: phoneNumber,
      }),
      invalidatesTags: ["user"],
    }),

    verifyOtp: build.mutation({
      query: (verificationData) => ({
        url: `${VERIFY_URL}/verify-otp`,
        method: "POST",
        data: verificationData,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: build.mutation({
      query: (updateData) => ({
        url: `${VERIFY_URL}/reset-password`,
        method: "POST",
        data: updateData,
      }),
      invalidatesTags: ["user"],
    }),

    updateProfile: build.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useGetUserQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
  useUpdateProfileMutation,
} = authApi;

export default authApi;
