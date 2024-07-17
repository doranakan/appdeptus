import {
  Box,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { useGetUserProfileQuery } from '../../api'

const UserProfile = () => {
  const { data } = useGetUserProfileQuery()

  if (!data) {
    return <Spinner />
  }

  return (
    <VStack p={'$4'}>
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
          <Text
            bold
            color='$secondary50'
            size='xl'
            textAlign='center'
          >
            {data.name[0]}
          </Text>
        </Box>
        <Heading
          color='$secondary50'
          size='3xl'
          textAlign='center'
        >
          {data.name}
        </Heading>
      </HStack>
    </VStack>
  )
}

export default UserProfile
