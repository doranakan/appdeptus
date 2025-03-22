import {
  Badge,
  Card,
  HStack,
  Icon,
  InsetShadow,
  ScreenTitle,
  selectThemeName,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import InnerBorder from 'appdeptus/components/InnerBorder'
import { useModelCount, useUnitCount, useWarlord } from 'appdeptus/hooks'
import { type Army } from 'appdeptus/models'
import { Eye, EyeOff } from 'lucide-react-native'
import { memo } from 'react'
import { Switch } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { useUpdateArmyData, useUpdateArmyVisibilityMutation } from '../../api'

type RosterTopContainerProps = {
  army: Army

  isUsersArmy?: boolean
}

const RosterTopContainer = ({ army, isUsersArmy }: RosterTopContainerProps) => {
  const unitCount = useUnitCount(army.roster)

  const numberOfModels = useModelCount(army.roster)

  const warlord = useWarlord(army.roster)

  const [updateArmyVisibility] = useUpdateArmyVisibilityMutation()

  const updateArmyData = useUpdateArmyData()

  const theme = useSelector(selectThemeName)

  return (
    <VStack space='md'>
      <ScreenTitle>{army.name}</ScreenTitle>
      <Card>
        <VStack
          className='p-4'
          space='md'
        >
          <HStack className='items-center justify-between'>
            <Text
              className='uppercase'
              family='body-bold'
              size='xl'
            >
              {army.codex.name}
            </Text>
            <Badge text={`${army.points}PTS`} />
          </HStack>
          <HStack
            className='items-center'
            space='md'
          >
            <Text>Detachment:</Text>
            <Badge
              text={army.detachment.name}
              variant='tertiary'
            />
          </HStack>
          <HStack space='md'>
            <Text>Warlord:</Text>
            <Text family='body-bold'>{warlord?.name}</Text>
          </HStack>
          <HStack space='md'>
            <Text>
              Units: <Text family='body-bold'>{unitCount}</Text>
            </Text>
            <Text>|</Text>
            <Text>
              Models: <Text family='body-bold'>{numberOfModels}</Text>
            </Text>
          </HStack>
          {isUsersArmy ? (
            <InsetShadow
              className='overflow-hidden rounded-3xl'
              borderRadius={20}
            >
              <HStack className='items-center justify-between bg-primary-800 p-2'>
                <HStack
                  className='flex-1 items-center px-2'
                  space='md'
                >
                  <Icon
                    as={army.isSecret ? EyeOff : Eye}
                    className='px-2 text-primary-50'
                  />
                  <Text>{`${army.isSecret ? 'Not visible' : 'Visible'} to communities`}</Text>
                </HStack>
                <Switch
                  ios_backgroundColor={themeColors[theme].secondary[300]}
                  thumbColor={themeColors[theme].primary[50]}
                  trackColor={{
                    false: themeColors[theme].secondary[300],
                    true: themeColors[theme].tertiary[600]
                  }}
                  onChange={() => {
                    updateArmyVisibility({
                      id: army.id,
                      isSecret: !army.isSecret
                    }).then(() => {
                      updateArmyData({
                        id: army.id,
                        isSecret: !army.isSecret
                      })
                    })
                  }}
                  value={!army.isSecret}
                />
              </HStack>
            </InsetShadow>
          ) : null}
          {!army.isValid ? (
            <InnerBorder>
              <VStack
                className='rounded-3xl bg-warning-700 p-4'
                space='md'
              >
                <Text
                  family='body-bold'
                  size='lg'
                >
                  ⚠️ Inquisition Warning
                </Text>
                {isUsersArmy ? (
                  <Text
                    className='text-justify'
                    family='body-regular-italic'
                    size='sm'
                  >
                    This codex has been updated. You need to apply changes and
                    save it to use it in your games again.
                  </Text>
                ) : null}
              </VStack>
            </InnerBorder>
          ) : null}
        </VStack>
      </Card>
    </VStack>
  )
}

export default memo(RosterTopContainer)
