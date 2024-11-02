import {
  ArmyBackground,
  selectThemeName,
  themeColors,
  VStack
} from 'appdeptus/components'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { useSelector } from 'react-redux'

const ArmyBuilderBackground = () => {
  const themeName = useSelector(selectThemeName)

  if (themeName === 'default') {
    return null
  }

  return (
    <VStack className='absolute z-0 h-full w-full flex-1'>
      <VStack className='flex-1' />
      <VStack className='flex-1'>
        <ArmyBackground codex={themeName} />
        <LinearGradient
          colors={[
            themeColors[themeName].primary[950],
            `${themeColors[themeName].primary[950]}00`,
            themeColors[themeName].primary[950]
          ]}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        />
      </VStack>
    </VStack>
  )
}

export default memo(ArmyBuilderBackground)
