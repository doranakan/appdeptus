import clsx from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import React, { type ComponentProps, type PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'

type ScreenContainerProps = {
  hideBottomGradient?: boolean
  safeAreaInsets?: ('top' | 'bottom')[]
} & ComponentProps<typeof VStack>

const ScreenContainer = ({
  children,
  className,

  hideBottomGradient,
  safeAreaInsets,

  ...props
}: PropsWithChildren<ScreenContainerProps>) => {
  const { top, bottom } = useSafeAreaInsets()

  const themeName = useSelector(selectThemeName)

  return (
    <>
      <VStack
        className={clsx('flex-1 bg-primary-950', className)}
        style={{
          paddingBottom: safeAreaInsets?.includes('bottom')
            ? bottom
            : undefined,
          paddingTop: safeAreaInsets?.includes('top') ? top : undefined
        }}
        {...props}
      >
        {children}
      </VStack>
      {!hideBottomGradient ? (
        <LinearGradient
          colors={[
            `${themeColors[themeName].primary[950]}00`,
            themeColors[themeName].primary[950]
          ]}
          style={{
            position: 'absolute',
            height: 40,
            width: '100%',
            bottom: safeAreaInsets?.includes('bottom') ? bottom - 1 : 0 // this shitty -1 is a workaround to make sure that the gradient meats the safe area correctly
          }}
        />
      ) : null}
    </>
  )
}

export default ScreenContainer
