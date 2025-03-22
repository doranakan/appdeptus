import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { selectImageFromGallery, supabase } from 'appdeptus/utils'
import { Bucket, Table } from 'appdeptus/utils/supabase'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import { type CommunitiesApiTags } from '../tags'

type UpdateCommunityImageArgs = Pick<Community, 'id' | 'image'>

const updateCommunityImage = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.mutation<null, UpdateCommunityImageArgs>({
    queryFn: async ({ id, image: prevImage }) => {
      try {
        const image = await selectImageFromGallery()

        if (!image) {
          return {
            error: 'Operation cancelled'
          }
        }

        const { data: uploadedData, error: uploadError } =
          await supabase.storage
            .from(Bucket.COMMUNITY_IMAGES)
            .upload(`${randomUUID()}.webp`, decode(image.base64 ?? ''), {
              contentType: 'image/webp'
            })

        if (uploadError) {
          return { error: JSON.stringify(uploadError) }
        }

        const { data: uploadedImage } = supabase.storage
          .from(Bucket.COMMUNITY_IMAGES)
          .getPublicUrl(uploadedData.path)

        const { error } = await supabase
          .from(Table.COMMUNITIES)
          .update({ image: uploadedImage.publicUrl })
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const split = prevImage?.split('/')
        if (split?.length) {
          const prevImageName = split[split.length - 1]
          if (prevImageName) {
            supabase.storage
              .from(Bucket.COMMUNITY_IMAGES)
              .remove([prevImageName])
          }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err, { id }) =>
      !err ? [{ type: 'communities', id }] : []
  })

export default updateCommunityImage
