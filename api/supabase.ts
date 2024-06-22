import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({})
})

const reducer = supabaseApi.reducer
const reducerPath = supabaseApi.reducerPath

export { reducer, reducerPath }

export default supabaseApi
