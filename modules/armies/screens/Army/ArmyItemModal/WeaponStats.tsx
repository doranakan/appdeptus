import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { Text } from 'appdeptus/designSystem'
import { type Weapon } from 'appdeptus/models'
import { uniq } from 'lodash'
import { useMemo } from 'react'

type WeaponStatsProps = {
  weapons: Weapon[]
}

const WeaponStats = ({ weapons }: WeaponStatsProps) => {
  const statNames = useMemo(() => {
    const stats = weapons.map(({ stats }) => stats)[0]

    if (stats) {
      return uniq(
        Object.keys(stats).map((key) => {
          switch (key) {
            case 'bsWs':
              return 'Bs/Ws'
            default:
              return key
          }
        })
      )
    }
    return []
  }, [weapons])
  return (
    <VStack gap='$2'>
      <HStack justifyContent='space-between'>
        {statNames.map((stat) => (
          <Box
            key={stat}
            width={40}
          >
            <Text
              fontWeight='$bold'
              size='xs'
              textAlign='center'
              textTransform='capitalize'
            >
              {stat}
            </Text>
          </Box>
        ))}
      </HStack>
      {weapons.map(({ id, name, stats, type }) => (
        <VStack
          key={id}
          gap='$1'
        >
          <HStack>
            <Text size='xs'>{name}</Text>
          </HStack>
          <HStack
            backgroundColor='$backgroundLight0'
            justifyContent='space-between'
          >
            {Object.entries(stats).map(([key, val], index) => (
              <Box
                key={`${val}-${index}`}
                width={40}
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
        </VStack>
      ))}
    </VStack>
  )
}

export default WeaponStats
