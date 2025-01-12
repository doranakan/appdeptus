import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import clsx from 'clsx'
import { BlurView } from 'expo-blur'
import {
  forwardRef,
  type ForwardRefRenderFunction,
  memo,
  type PropsWithChildren,
  type ReactElement
} from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import InnerBorder from '../InnerBorder'
import { Pressable, VStack } from '../ui'

type BottomSheetProps = {
  dismissDisabled?: boolean
  onDismiss?: () => void
  onPressBackdrop?: () => void
  scrollDisabled?: boolean
  StickyHeader?: ReactElement | null
}

const BottomSheet: ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetProps>
> = (
  {
    children,
    dismissDisabled,
    onDismiss,
    onPressBackdrop,
    scrollDisabled,
    StickyHeader
  },
  ref
) => {
  const window = useWindowDimensions()

  const { top } = useSafeAreaInsets()

  return (
    <BottomSheetModal
      ref={ref}
      style={styles.container}
      backgroundStyle={styles.container}
      handleComponent={null}
      detached={false}
      overDragResistanceFactor={0}
      maxDynamicContentSize={window.height - top}
      onDismiss={onDismiss}
      backdropComponent={() => (
        <Pressable
          disabled={dismissDisabled}
          className='absolute h-full w-full'
          onPress={onPressBackdrop}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <InnerBorder>
          <BlurView>
            {StickyHeader}
            <VStack
              className='overflow-x-visible'
              space='md'
            >
              <ScrollView
                className={clsx(
                  'overflow-x-visible px-4',
                  dismissDisabled ? 'py-4' : 'py-8'
                )}
                contentContainerClassName='pb-10'
                scrollEnabled={!scrollDisabled}
                showsVerticalScrollIndicator={false}
              >
                <SafeAreaView edges={['bottom']}>{children}</SafeAreaView>
              </ScrollView>
              {!dismissDisabled ? (
                <VStack
                  className='absolute top-4 h-2 w-16 self-center rounded-full bg-primary-50'
                  hitSlop={16}
                />
              ) : null}
            </VStack>
          </BlurView>
        </InnerBorder>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    minHeight: 10
  }
})

export default memo(forwardRef(BottomSheet))
