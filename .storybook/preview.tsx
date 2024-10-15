import type { Preview } from '@storybook/react'
import { StoryContainer } from './decorators'

const preview: Preview = {
  decorators: [StoryContainer],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
