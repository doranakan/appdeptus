import { Box, HStack, Icon, Text, VStack } from '@gluestack-ui/themed'
import { type Weapon } from 'appdeptus/models'
import { capitalize, uniq } from 'lodash'
import { Crosshair, Swords } from 'lucide-react-native'
import { useMemo } from 'react'

type WeaponStatsProps = {
  weapons: Weapon[]
  type: Weapon['type']
}

const WeaponStats = ({ weapons, type }: WeaponStatsProps) => {
  const statNames = useMemo(() => {
    const stats = weapons.map(({ stats }) => stats)[0]

    if (stats) {
      return uniq(
        Object.keys(stats).map((key) => {
          switch (key) {
            case 'range':
              return 'Rng'
            case 'bsWs':
              return type === 'ranged' ? 'Bs' : 'Ws'
            default:
              return key
          }
        })
      )
    }
    return []
  }, [type, weapons])

  if (!weapons.length) {
    return null
  }

  return (
    <VStack gap='$2'>
      <HStack
        bg='$secondary600'
        px='$2'
        py='$1'
      >
        <HStack
          flex={1}
          justifyContent='space-between'
        >
          <HStack gap='$2'>
            <Icon
              as={type === 'ranged' ? Crosshair : Swords}
              color='$white'
              h='$8'
              w='$8'
            />
            <Text
              color='$white'
              fontWeight='$bold'
              numberOfLines={1}
              size='xs'
              textAlign='center'
              textTransform='capitalize'
            >
              {`${capitalize(type)} weapons`}
            </Text>
          </HStack>
          <HStack>
            {statNames.map((stat) => (
              <Box
                key={stat}
                width={30}
              >
                <Text
                  color='$white'
                  fontWeight='$bold'
                  numberOfLines={1}
                  size='xs'
                  textAlign='center'
                  textTransform='capitalize'
                >
                  {stat}
                </Text>
              </Box>
            ))}
          </HStack>
        </HStack>
      </HStack>

      <VStack>
        {weapons.map(({ id, name, stats }, index) => (
          <HStack
            backgroundColor={index % 2 !== 0 ? '$secondary100' : '$transparent'}
            key={id}
            justifyContent='space-between'
            px='$2'
            py='$1'
          >
            <HStack maxWidth='40%'>
              <Text
                ellipsizeMode='tail'
                numberOfLines={1}
                size='xs'
              >
                {name}
              </Text>
            </HStack>
            <HStack justifyContent='space-between'>
              {Object.entries(stats).map(([key, val], index) => (
                <Box
                  key={`${val}-${index}`}
                  width={30}
                >
                  <Text
                    size='sm'
                    textAlign='center'
                  >
                    {`${val ?? '-'}${key === 'range' && type === 'ranged' ? '"' : ''}`}
                  </Text>
                </Box>
              ))}
            </HStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

export default WeaponStats
