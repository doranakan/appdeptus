import { Button } from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import { RedoDot } from 'lucide-react-native'
import { memo } from 'react'
import { useNextTurnMutation } from '../../api'

type NextButtonProps = {
  gameId: ActiveGame['id']
  status: ActiveGame['status']
}

const NextButton = ({ gameId, status }: NextButtonProps) => {
  const [setNextTurn, { isLoading }] = useNextTurnMutation()

  return (
    <Button
      Icon={RedoDot}
      loading={isLoading}
      onPress={async () => await setNextTurn({ currentStatus: status, gameId })}
      text={status.endsWith('1') ? "Defender's turn" : 'Next turn'}
    />
  )
}

export default memo(NextButton)
