import { Box } from 'appdeptus/components/ui/box'
import { Heading } from 'appdeptus/components/ui/heading'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Spinner } from 'appdeptus/components/ui/spinner'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { useGetUserProfileQuery } from '../../api'

const UserProfile = () => {
  const { data } = useGetUserProfileQuery()

  if (!data) {
    return <Spinner />
  }

  return (
    <VStack className='p-4'>
      <HStack className='items-center gap-2'>
        <Box className='items-center bg-secondary-700 rounded-full h-[50px] justify-center w-[50px]'>
          <Text
            bold
            size='xl'
            className='text-secondary-50 text-center'
          >
            {data.name[0]}
          </Text>
        </Box>
        <Heading
          size='2xl'
          className='text-secondary-50 leading-2xl text-center'
        >
          {data.name}
        </Heading>
      </HStack>
    </VStack>
  )
}

export default UserProfile
