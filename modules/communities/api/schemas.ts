import { userProfileSchema } from 'appdeptus/modules/user/api'
import { z } from 'zod'

const memberSchema = z.object({
  role: z.union([z.literal('admin'), z.literal('member')]),
  user: userProfileSchema
})

const baseCommunitySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    created_at: z.string()
  })
  .transform(({ created_at, ...community }) => ({
    ...community,
    createdAt: created_at
  }))

const communitySchema = baseCommunitySchema
  .and(
    z.object({
      members: z.array(memberSchema)
    })
  )
  .transform(({ members, ...community }) => ({
    ...community,
    members: members.map(({ user, ...member }) => ({
      ...member,
      ...user
    }))
  }))

const communityListSchema = z.array(
  z
    .object({
      community: communitySchema
    })
    .transform(({ community }) => community)
)

const searchCommunitySchema = z.array(baseCommunitySchema)

export {
  baseCommunitySchema,
  communityListSchema,
  communitySchema,
  searchCommunitySchema
}
