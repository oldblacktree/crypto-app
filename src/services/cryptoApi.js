import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "f76274d6e2msh23907cd5b09be22p192536jsnd9b1f23b7d67",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "f76274d6e2msh23907cd5b09be22p192536jsnd9b1f23b7d67"
      );
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => {
        return `/coin/${coinId}/history?timePeriod=${timePeriod}`;
      },
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
