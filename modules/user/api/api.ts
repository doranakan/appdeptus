import { coreApi } from 'appdeptus/api'
import { getUserProfile, updateUserName } from './endpoints'
import { userApiTags } from './tags'

const userApi = coreApi
  .enhanceEndpoints({ addTagTypes: userApiTags })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserProfile: getUserProfile(builder),
      updateUserName: updateUserName(builder)
    }),
    overrideExisting: true
  })

export default userApi
