import { coreApi } from 'appdeptus/api'
import { getUserProfile, updateUserName } from './endpoints'
import UserApiTag from './tags'

const userApi = coreApi
  .enhanceEndpoints({ addTagTypes: [UserApiTag.USER] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserProfile: getUserProfile(builder),
      updateUserName: updateUserName(builder)
    }),
    overrideExisting: true
  })

export default userApi
