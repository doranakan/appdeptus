import { Button, ScreenContainer, ScreenTitle } from 'appdeptus/components'
import * as Notifications from 'expo-notifications'
import ArmyList from './ArmyList'

const ArmiesTab = () => (
  <ScreenContainer
    className='px-4'
    space='md'
  >
    <ScreenTitle>army library</ScreenTitle>
    <Button
      variant='callback'
      text='send'
      onPress={() => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here', url: '/communities/40/settings' }
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2
          }
        })
      }}
    />
    <ArmyList />
  </ScreenContainer>
)

export default ArmiesTab
