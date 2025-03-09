import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({})
})

const reducer = notificationsApi.reducer
const reducerPath = notificationsApi.reducerPath

export { reducer, reducerPath }

export default notificationsApi
