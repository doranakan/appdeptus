import type { Meta, StoryObj } from '@storybook/react'
import Error from './Error'

const ErrorMeta: Meta<typeof Error> = {
  title: 'Error',
  component: Error,
  args: {}
}

export default ErrorMeta

type Story = StoryObj<typeof ErrorMeta>

export const Default: Story = {}
