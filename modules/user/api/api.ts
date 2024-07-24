import { coreApi } from 'appdeptus/api'
import { getUserProfile } from './endpoints'

const userApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: getUserProfile(builder)
  }),
  overrideExisting: true
})

export default userApi
