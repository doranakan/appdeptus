import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({})
})

const reducer = coreApi.reducer
const reducerPath = coreApi.reducerPath

export { reducer, reducerPath }

export default coreApi
