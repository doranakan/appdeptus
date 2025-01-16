import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import clsx from 'clsx'
import { BlurView } from 'expo-blur'
import {
  forwardRef,
  type ForwardRefRenderFunction,
  memo,
  type PropsWithChildren
} from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InnerBorder from '../InnerBorder'
import { VStack } from '../ui'
import Backdrop from './Backdrop'

type BottomSheetProps = {
  onDismiss?: () => void
  onPressBackdrop?: () => void
  scrollDisabled?: boolean
}

const BottomSheet: ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetProps>
> = ({ children, onDismiss, onPressBackdrop, scrollDisabled }, ref) => {
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
      backdropComponent={(props) => (
        <Backdrop
          {...props}
          onPress={onPressBackdrop}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <InnerBorder>
          <BlurView>
            <VStack
              className='overflow-x-visible'
              space='md'
            >
              <VStack
                className='mt-4 h-2 w-16 self-center rounded-full bg-primary-50'
                hitSlop={16}
              />
              <ScrollView
                className={clsx('overflow-x-visible px-4')}
                contentContainerClassName='pb-10'
                scrollEnabled={!scrollDisabled}
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
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
