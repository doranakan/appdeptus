import clsx from 'clsx'
import { type ComponentProps, type PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VStack } from '../ui'

const ScreenContainer = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<typeof VStack>>) => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <VStack
      className={clsx('flex-1 bg-primary-950', className)}
      style={{
        paddingBottom: bottom,
        paddingTop: top
      }}
      {...props}
    >
      {children}
    </VStack>
  )
}

export default ScreenContainer
