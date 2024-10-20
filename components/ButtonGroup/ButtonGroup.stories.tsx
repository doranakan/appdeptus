import type { Meta, StoryObj } from '@storybook/react'
import Button from '../Button/Button'
import ButtonGroup from './ButtonGroup'

const ButtonGroupMeta: Meta<typeof ButtonGroup> = {
  title: 'ButtonGroup',
  component: (props) => (
    <ButtonGroup {...props}>
      <Button
        variant='callback'
        onPress={() => {}}
        size='sm'
        text='Button 1'
      />
      <Button
        variant='callback'
        onPress={() => {}}
        size='sm'
        text='Button 2'
      />
    </ButtonGroup>
  )
}

export default ButtonGroupMeta

type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {}
