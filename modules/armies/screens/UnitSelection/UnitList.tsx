import { Box } from '@gluestack-ui/themed'
import { type ArmyForm, type Codex, type CodexUnit } from 'appdeptus/models'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UnitListItem from './UnitListItem'

type UnitListProps = {
  codexId: Codex['id']
  units: CodexUnit[]
}

const UnitList = ({ codexId, units }: UnitListProps) => {
  const insets = useSafeAreaInsets()

  const { watch } = useFormContext<ArmyForm>()
  const selectedUnits = watch('units')

  const renderItem = useCallback<ListRenderItem<CodexUnit>>(
    ({ item: unit, index }) => {
      let points = 0
      for (const choice of selectedUnits) {
        const tier = unit.tiers.find((t) => t.id === choice.tier)
        if (tier) {
          points += tier.points
        }
      }

      const count = selectedUnits.filter(
        ({ unit: unitId }) => unitId === unit.id
      ).length

      return (
        <UnitListItem
          codexId={codexId}
          count={count}
          points={points ?? unit.tiers[0]?.points ?? 0}
          unitIndex={index}
          unit={unit}
        />
      )
    },
    [codexId, selectedUnits]
  )

  return (
    <FlatList
      data={units}
      ItemSeparatorComponent={() => <Box height='$4' />}
      ListFooterComponent={() => <Box height={insets.bottom + 16} />}
      keyExtractor={(unit) => unit.id}
      renderItem={renderItem}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingRight: 16,
    paddingVertical: 16
  }
})

export default UnitList
