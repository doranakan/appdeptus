import { skipToken } from '@reduxjs/toolkit/query'
import { Loading, Modal } from 'appdeptus/components'
import { useArmyTintEffect } from 'appdeptus/designSystem'
import { type Army } from 'appdeptus/models'
import { ArmyCoverImage, UnitList } from 'appdeptus/modules/armies/components'
import { useLocalSearchParams } from 'expo-router'
import { useGetGameArmyQuery } from '../../api'

const ArmyScreen = () => {
  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data } = useGetGameArmyQuery(armyId ?? skipToken)

  if (!data) {
    return <Loading />
  }

  return <ArmyContent army={data} />
}

type ArmyContentProps = {
  army: Army
}

const ArmyContent = ({ army }: ArmyContentProps) => {
  useArmyTintEffect(army.codex.name)

  return (
    <>
      <ArmyCoverImage codexName={army.codex.name} />
      <Modal title={army.codex.name}>
        <UnitList army={army} />
      </Modal>
    </>
  )
}

export default ArmyScreen
