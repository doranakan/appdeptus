import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({})
})

export default supabaseApi
