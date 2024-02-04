import { FontAwesome5 } from '@expo/vector-icons'
import { Box, Pressable, ScrollView, Text } from '@gluestack-ui/themed'
import { Loading } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { useGetFactionsQuery } from '../../api'

const FactionSelectionScreen = () => {
  const router = useRouter()

  const { data: factions } = useGetFactionsQuery()

  if (!factions) {
    return <Loading />
  }

  return (
    <ScrollView>
      <Box flex={1} flexWrap='wrap' flexDirection='row' gap='$4' p='$4'>
        {factions.map((faction) => (
          <Box flexGrow={1} flexBasis='40%' height={150} key={faction.id}>
            <Pressable
              $active-bgColor='$light200'
              backgroundColor='$white'
              borderRadius='$md'
              alignItems='center'
              flex={1}
              gap='$2'
              justifyContent='center'
              onPress={() =>
                router.navigate({
                  params: {
                    factionId: faction.id
                  },
                  pathname: '/home/army-builder/codex-selection'
                })
              }
              p='$4'
            >
              <Text color='$blue500' size='xl'>
                <FontAwesome5
                  name={factionIcons[faction.id] ?? 'home'}
                  size={24}
                />
              </Text>
              <Text fontWeight='$bold' textAlign='center'>
                {faction.name}
              </Text>
            </Pressable>
          </Box>
        ))}
      </Box>
    </ScrollView>
  )
}

const factionIcons: Record<string, string> = {
  ['2']: 'bacterium',
  ['3']: 'vihara',
  ['4']: 'tree',
  ['5']: 'dragon',
  ['6']: 'octopus-deploy',
  ['7']: 'skull',
  ['8']: 'dungeon',
  ['9']: 'egg'
}

export default FactionSelectionScreen
