import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type UserProfile } from 'appdeptus/models'
import { selectImageFromGallery, supabase } from 'appdeptus/utils'
import { Bucket, Table } from 'appdeptus/utils/supabase'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import { type UserApiTags } from '../tags'

const updateUserImage = (builder: CoreEndpointBuilder<UserApiTags>) =>
  builder.mutation<null, UserProfile['image']>({
    queryFn: async (prevImage) => {
      try {
        const user = await getUserId()

        if (typeof user === 'object') {
          return { error: user.error }
        }

        const image = await selectImageFromGallery()

        if (!image) {
          return {
            error: 'Operation cancelled'
          }
        }

        const { data: uploadedData, error: uploadError } =
          await supabase.storage
            .from(Bucket.PROFILE_IMAGES)
            .upload(`${randomUUID()}.webp`, decode(image.base64 ?? ''), {
              contentType: 'image/webp'
            })

        if (uploadError) {
          return { error: JSON.stringify(uploadError) }
        }

        const { data: uploadedImage } = supabase.storage
          .from(Bucket.PROFILE_IMAGES)
          .getPublicUrl(uploadedData.path)

        const { error } = await supabase
          .from(Table.USERS)
          .update({ image: uploadedImage.publicUrl })
          .eq('id', user)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const split = prevImage?.split('/')
        if (split?.length) {
          const prevImageName = split[split.length - 1]
          if (prevImageName) {
            supabase.storage.from(Bucket.PROFILE_IMAGES).remove([prevImageName])
          }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err) => (!err ? ['user'] : [])
  })

export default updateUserImage
