import {
  HStack,
  Pressable,
  selectThemeName,
  setTheme,
  Text
} from 'appdeptus/components'
import { themes } from 'appdeptus/constants'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

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
        <HStack space='4xl'>
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
