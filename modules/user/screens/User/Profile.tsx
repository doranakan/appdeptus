import { Box, HStack, Heading, Spinner, VStack } from '@gluestack-ui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetUserProfileQuery } from '../../api'

const UserProfile = () => {
  const { data } = useGetUserProfileQuery()

  const insets = useSafeAreaInsets()

  if (!data) {
    return <Spinner />
  }

  return (
    <VStack
      px={'$4'}
      pt={insets.top}
      flex={1}
    >
      <HStack
        alignItems='center'
        gap='$2'
      >
        <Box
          alignItems='center'
          backgroundColor='$secondary700'
          borderRadius='$full'
          h={50}
          justifyContent='center'
          w={50}
        >
          <Heading
            color='$secondary50'
            size='xl'
            textAlign='center'
          >
            {data.name[0]}
          </Heading>
        </Box>
        <Heading
          color='$secondary50'
          fontFamily='$mono'
          size='3xl'
          textAlign='center'
          textTransform='capitalize'
        >
          {data.name}
        </Heading>
      </HStack>
    </VStack>
  )
}

export default UserProfile
