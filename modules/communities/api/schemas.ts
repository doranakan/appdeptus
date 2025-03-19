import { userProfileSchema } from 'appdeptus/modules/user/api'
import { z } from 'zod'

const memberSchema = z.object({
  role: z.union([z.literal('admin'), z.literal('member')]),
  user: userProfileSchema,
  wins: z.number(),
  losses: z.number(),
  ties: z.number()
})

const baseCommunitySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    created_at: z.string(),
    secret: z.boolean()
  })
  .transform(({ created_at, secret, ...community }) => ({
    ...community,
    createdAt: created_at,
    isSecret: secret
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

const communityRequestListSchema = z.array(
  z
    .object({
      user: userProfileSchema,
      updated_at: z.string()
    })
    .transform(({ updated_at, ...rest }) => ({
      ...rest,
      updatedAt: updated_at
    }))
)

const searchCommunitySchema = z.array(baseCommunitySchema)

const commonCommunitiesSchema = z.array(
  z
    .object({
      community: baseCommunitySchema
    })
    .transform(({ community }) => community)
)

export {
  baseCommunitySchema,
  commonCommunitiesSchema,
  communityListSchema,
  communityRequestListSchema,
  communitySchema,
  searchCommunitySchema
}
