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
  'Adepta Sororitas',
  'Adeptus Custodes',
  'Adeptus Mechanicus',
  'Aeldari',
  'Agents of the Imperium',
  'Astra Militarum',
  'Black Templars',
  'Blood Angels',
  'Chaos Daemons',
  'Chaos Space Marines',
  'Dark Angels',
  'Death Guard',
  'Drukhari',
  'Genestealer Cults',
  'Grey Knights',
  'Leagues of Votann',
  'Necrons',
  'Orks',
  'Space Marines',
  'Space Wolves',
  "T'Au Empire",
  'Thousand Sons',
  'Tyranids',
  'World Eaters'
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
