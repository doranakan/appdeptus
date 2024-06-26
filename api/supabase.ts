import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { isHydrateAction } from './utils'

const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo: (action): any => {
    if (isHydrateAction(action)) {
      if (action.key === 'root') {
        return action.payload
      }

      return action.payload[supabaseApi.reducerPath]
    }
  }
})

const reducer = supabaseApi.reducer
const reducerPath = supabaseApi.reducerPath

export { reducer, reducerPath }

export default supabaseApi
