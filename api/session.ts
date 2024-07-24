import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({})
})

const reducer = sessionApi.reducer
const reducerPath = sessionApi.reducerPath

export { reducer, reducerPath }

export default sessionApi
