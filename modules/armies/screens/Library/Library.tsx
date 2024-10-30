import { Button, ScreenContainer, Text } from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'

const ArmyLibrary = () => {
  const [signOut, { isLoading }] = useSignOutMutation()

  return (
    <ScreenContainer
      className='items-center justify-center'
      space='md'
    >
      <Text>Army Library</Text>
      <Button
        loading={isLoading}
        onPress={signOut}
        text='Sign out'
        variant='callback'
      />
    </ScreenContainer>
  )
}

export default ArmyLibrary
