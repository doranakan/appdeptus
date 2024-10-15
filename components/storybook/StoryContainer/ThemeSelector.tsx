import {
  HStack,
  Pressable,
  selectThemeName,
  setTheme,
  Text,
  type ThemeName
} from 'appdeptus/components'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const themes: ThemeName[] = [
  'default',
  'adeptaSororitas',
  'adeptusCustodes',
  'adeptusMechanicus',
  'aeldari',
  'agentsOfTheImperium',
  'astraMilitarum',
  'blackTemplars',
  'bloodAngels',
  'chaosDaemons',
  'chaosSpaceMarines',
  'darkAngels',
  'deathGuard',
  'drukhari',
  'genestealerCults',
  'greyKnights',
  'leaguesOfVotann',
  'necrons',
  'orks',
  'spaceMarines',
  'spaceWolves',
  'tauEmpire',
  'thousandSons',
  'tyranids',
  'worldEaters'
]

const ThemeSelector = () => {
  const dispatch = useDispatch()

  const selectedTheme = useSelector(selectThemeName)

  return (
    <HStack space='md'>
      <Text className='uppercase color-primary-50'>Theme:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <HStack space='lg'>
          {themes.map((theme) => (
            <Pressable
              key={theme}
              onPress={() => dispatch(setTheme(theme))}
            >
              <Text
                className={`${selectedTheme === theme ? 'color-primary-50' : 'color-primary-400'} uppercase`}
                family='body-bold'
              >
                {theme}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </HStack>
  )
}

export default ThemeSelector
