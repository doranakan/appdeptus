import {
  EnhancementListItem,
  Pressable,
  Text,
  UnitListItem,
  VStack
} from 'appdeptus/components'
import {
  type ArmyBuilder,
  type Character,
  type Enhanceable,
  type Enhancement,
  type Leader
} from 'appdeptus/models'
import { memo, type PropsWithChildren, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ScrollView } from 'react-native'

type EnhancementAssignmentProps = {
  enhancements: Enhancement[]
}

const EnhancementAssignment = ({
  enhancements: allEnhancements
}: EnhancementAssignmentProps) => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedEnhancements = watch('detachment.enhancements')

  const [enhancementToAssign, setEnhancementToAssign] = useState<Enhancement>()

  const units = watch('units')

  const charactersAndLeaders = useMemo(
    () =>
      units.filter<(Character | Leader) & Enhanceable>(
        (unit) =>
          (unit.type === 'character' || unit.type === 'leader') && !unit.hero
      ),
    [units]
  )

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
    >
      <StickyHeader>enhancements</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {allEnhancements
          .filter(
            ({ id }) =>
              !charactersAndLeaders.find(
                (unit) => 'enhancement' in unit && unit.enhancement?.id === id
              )
          )
          .map((enhancement) => (
            <Pressable
              key={enhancement.id}
              onPress={() => {
                switch (true) {
                  case enhancementToAssign &&
                    enhancementToAssign.id !== enhancement.id: {
                    setEnhancementToAssign(enhancement)
                    return
                  }
                  case !!enhancementToAssign: {
                    setEnhancementToAssign(undefined)
                    return
                  }
                  default: {
                    setEnhancementToAssign(enhancement)
                  }
                }
              }}
            >
              <EnhancementListItem
                enhancement={enhancement}
                variant={
                  enhancementToAssign?.id === enhancement.id
                    ? 'selected'
                    : !enhancementToAssign
                      ? 'selectable'
                      : 'disabled'
                }
              />
            </Pressable>
          ))}
      </VStack>
      <StickyHeader>characters</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {charactersAndLeaders.map((characterOrLeader) => (
          <Pressable
            disabled={
              (!enhancementToAssign && !characterOrLeader.enhancement) ||
              (enhancementToAssign && !!characterOrLeader.enhancement)
            }
            key={characterOrLeader.selectionId}
            onPress={() => {
              const points = watch('points')

              const enhancement = characterOrLeader.enhancement

              if (enhancement) {
                setEnhancementToAssign(undefined)
                setValue(
                  'detachment.enhancements',
                  selectedEnhancements.filter(({ id }) => id !== enhancement.id)
                )
                setValue(
                  'units',
                  units.map((unit) => {
                    if (
                      'enhancement' in unit &&
                      unit.enhancement?.id === enhancement.id
                    ) {
                      return { ...unit, enhancement: undefined }
                    }
                    return unit
                  })
                )
                setValue('points', points - enhancement.points)
                return
              }

              if (enhancementToAssign) {
                setValue('detachment.enhancements', [
                  ...selectedEnhancements,
                  enhancementToAssign
                ])
                setValue('points', points + enhancementToAssign.points)
                setValue(
                  'units',
                  units.map((unit) => {
                    if (unit.selectionId === characterOrLeader.selectionId) {
                      return {
                        ...unit,
                        enhancement: enhancementToAssign
                      }
                    }
                    return unit
                  })
                )
              }

              setEnhancementToAssign(undefined)
            }}
          >
            <UnitListItem
              item={characterOrLeader}
              variant={
                characterOrLeader.enhancement && enhancementToAssign
                  ? 'disabled'
                  : characterOrLeader.enhancement
                    ? 'selected'
                    : !enhancementToAssign
                      ? 'disabled'
                      : 'selectable'
              }
            />
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}

const StickyHeader = ({ children }: PropsWithChildren) => (
  <Text
    className='uppercase'
    family='body-bold'
  >
    {children}
  </Text>
)

const stickyHeaderIndices = [0, 2]

export default memo(EnhancementAssignment)
