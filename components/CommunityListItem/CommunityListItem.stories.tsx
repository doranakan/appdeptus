import type { Meta, StoryObj } from '@storybook/react'
import CommunityListItem from './CommunityListItem'

const CommunityListItemMeta: Meta<typeof CommunityListItem> = {
  title: 'CommunityListItem',
  component: CommunityListItem,
  args: {
    community: {
      createdAt: '2025-03-05',
      id: 1,
      name: 'Officio Martellorum',
      isSecret: false,
      image:
        'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-1/408108875_338301902240153_1515720919691253208_n.jpg?stp=c10.8.545.545a_dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=JOsHDxd9NqUQ7kNvgGa1zOU&_nc_oc=AdmDEBn_0FZ2AQPcxuqX0dhhCwqAeGfo1ZG0cnmIWFlC_OOUQbtJhyXu22LO1LXei4I&_nc_zt=24&_nc_ht=scontent-zrh1-1.xx&_nc_gid=4hBJi3HRpOr3l7iE-zyyXA&oh=00_AYFBQnsqKiEsPOSx0SCfomgfuzdc5E2nSuFB27D_i9ueGg&oe=67E0CDEF'
    },
    notificationCount: 0,
    selected: false
  }
}

export default CommunityListItemMeta

type Story = StoryObj<typeof CommunityListItemMeta>

export const Default: Story = {}
export const Text: Story = {
  args: {
    community: {
      createdAt: '2025-03-05',
      id: 1,
      name: 'Officio Martellorum',
      isSecret: false,
      image: undefined
    }
  }
}
