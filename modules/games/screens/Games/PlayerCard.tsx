import { Box, HStack, Heading, Icon, Text, VStack } from '@gluestack-ui/themed'
import { ArmyIcon, Card } from 'appdeptus/components'
import { CodexName } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { repeat } from 'lodash'
import { Skull } from 'lucide-react-native'

const PlayerCard = () => {
  const { data: profile } = useGetUserProfileQuery()
  return (
    <Card
      gap='$2'
      opacity='$90'
    >
      <HStack
        alignItems='center'
        backgroundColor='$secondary700'
        gap='$2'
        my='$2'
        px='$2'
      >
        <Icon
          as={Skull}
          color='$secondary50'
        />
        <Heading color='$secondary50'>{profile?.name}</Heading>
      </HStack>
      <VStack gap='$2'>
        <HStack gap='$1'>
          <Text>Game played:</Text>
          <Text
            flex={1}
            numberOfLines={1}
          >
            {repeat('.', 1000)}
          </Text>
          <Text bold>27</Text>
        </HStack>
        <HStack gap='$1'>
          <Text>Game won:</Text>
          <Text
            flex={1}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {repeat('.', 1000)}
          </Text>
          <Text bold>16</Text>
        </HStack>
        <HStack gap='$1'>
          <Text>Last played:</Text>
          <Text
            flex={1}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {repeat('.', 1000)}
          </Text>
          <Text bold>Last week</Text>
        </HStack>
      </VStack>
      <VStack
        bg='$secondary200'
        gap='$2'
        p='$2'
      >
        <Box
          borderColor='$secondary700'
          borderBottomWidth='$1'
          borderLeftWidth='$1'
          px='$1'
        >
          <Heading color='$secondary700'>Armies</Heading>
        </Box>
        <HStack
          flexWrap='wrap'
          gap='$4'
        >
          <ArmyIcon
            codexName={CodexName.ADEPTA_SORORITAS}
            h={24}
            w={24}
            color='secondary700'
          />
          <ArmyIcon
            codexName={CodexName.AELDARI}
            h={24}
            w={24}
            color='secondary700'
          />
          <ArmyIcon
            codexName={CodexName.BLOOD_RAVENS}
            h={24}
            w={24}
            color='secondary700'
          />
          <ArmyIcon
            codexName={CodexName.TYRANIDS}
            h={24}
            w={24}
            color='secondary700'
          />
        </HStack>
      </VStack>
    </Card>
  )
}

export default PlayerCard
