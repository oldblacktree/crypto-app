import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://crypto-news16.p.rapidapi.com';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'f76274d6e2msh23907cd5b09be22p192536jsnd9b1f23b7d67');
      headers.set('X-RapidAPI-Host', 'crypto-news16.p.rapidapi.com');
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => `/news/top/${count}`,
    }),
  }),
})

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi