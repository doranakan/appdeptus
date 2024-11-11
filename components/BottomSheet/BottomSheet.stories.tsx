import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import type { Meta, StoryObj } from '@storybook/react'
import React, { createRef } from 'react'
import Button from '../Button'
import Text from '../Text'
import { VStack } from '../ui'
import BottomSheet from './BottomSheet'

const ref = createRef<BottomSheetModalMethods>()

const Wrapper = () => (
  <>
    <Button
      onPress={() => {
        ref.current?.present()
      }}
      variant='callback'
      text='show'
    />
    <BottomSheet
      ref={ref}
      onPressBackdrop={() => ref.current?.dismiss()}
    >
      <VStack className='mb-32 p-4'>
        <Text>This is a bottom sheet</Text>
      </VStack>
    </BottomSheet>
  </>
)

const BottomSheetMeta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: Wrapper
}

export default BottomSheetMeta

type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {}
