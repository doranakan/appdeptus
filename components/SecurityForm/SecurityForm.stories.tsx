import type { Meta, StoryObj } from '@storybook/react'
import SecurityForm from './SecurityForm'

const SecurityFormMeta: Meta<typeof SecurityForm> = {
  title: 'SecurityForm',
  component: SecurityForm,
  args: {
    loading: false,
    onPress: async () => {},
    securityFrase: 'security_frase',
    variant: 'account'
  }
}

export default SecurityFormMeta

type Story = StoryObj<typeof SecurityForm>

export const Default: Story = {}
