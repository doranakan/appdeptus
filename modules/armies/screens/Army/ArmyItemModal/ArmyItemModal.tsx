import { ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { Card, Loading, Modal } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import { uniqBy } from 'lodash'
import pluralize from 'pluralize'
import { useGetUnitOptionsQuery } from '../../../api'
import StatSheet from '../../../components/StatSheet'
import WeaponStats from './WeaponStats'

type ArmyItemModalProps = {
  unit: ArmyUnit
  onPressClose: () => void
  visible: boolean
}

const ArmyItemModal = ({
  unit,
  onPressClose,
  visible
}: ArmyItemModalProps): JSX.Element => (
  <Modal
    onPressClose={onPressClose}
    visible={visible}
    title={unit.name}
  >
    <ModalContent unit={unit} />
  </Modal>
)

type ModalContentProps = {
  unit: ArmyUnit
}

const ModalContent = ({ unit }: ModalContentProps) => {
  const { models } = useGetUnitOptionsQuery(unit.tier.id, {
    selectFromResult: ({ data }) => {
      if (!data) {
        return { models: undefined }
      }

      const models = data.map(({ options, ...rest }) => ({
        ...rest,
        options: unit.options
      }))

      return {
        models
      }
    }
  })

  if (!models) {
    return <Loading />
  }

  return (
    <ScrollView flex={1}>
      <VStack
        gap='$4'
        p='$4'
      >
        {models.map(({ count, model, baseWargear, options }, index) => (
          <Card
            gap='$2'
            key={`${model.id}-${index}`}
          >
            <Text fontWeight='$bold'>{`${count} ${pluralize(model.name, count)}`}</Text>
            <StatSheet model={model} />
            <Text
              fontWeight='$bold'
              size='sm'
            >
              Wargear
            </Text>
            <VStack
              backgroundColor='$secondary100'
              borderColor='$secondary300'
              borderWidth='$1'
              gap='$2'
              px='$4'
              py='$2'
            >
              <WeaponStats
                weapons={[
                  ...baseWargear.map(({ weapon }) => weapon),
                  ...uniqBy(
                    options.map(({ weapon }) => weapon),
                    'id'
                  )
                ]}
              />
            </VStack>
          </Card>
        ))}
      </VStack>
    </ScrollView>
  )
}

export default ArmyItemModal
