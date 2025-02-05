import {
  BottomSheet,
  Card,
  Dots,
  HStack,
  IconBadge,
  Text,
  VStack
} from 'appdeptus/components'
import { unitTypeToIcon } from 'appdeptus/components/utils'
import { type ArmyBuilder, type Unit } from 'appdeptus/models'
import { CircleFadingPlus, type LucideIcon } from 'lucide-react-native'
import pluralize from 'pluralize'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import ref from './ref'

const InfoBottomSheet = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const [points, units] = watch(['points', 'units'])

  const unitDetail = useMemo(
    () =>
      units?.reduce<
        Record<
          Unit['type'],
          {
            count: number
            models: number
            points: number
          }
        >
      >((acc, unit) => {
        const curr = acc[unit.type]

        return {
          ...acc,
          [`${unit.type}`]: {
            ...curr,
            count: curr.count + 1,
            models: curr.models + unit.tier.models,
            points: curr.points + unit.tier.points
          }
        }
      }, baseUnitDetail),
    [units]
  )

  const enhancementDetail = useMemo(
    () =>
      units?.reduce(
        (acc, unit) => {
          if ('enhancement' in unit && unit.enhancement) {
            return {
              count: acc.count + 1,
              points: acc.points + unit.enhancement.points
            }
          }

          return acc
        },
        { count: 0, points: 0 }
      ),
    [units]
  )

  if (!points || !units?.length) {
    return null
  }

  return (
    <BottomSheet
      ref={ref}
      onPressBackdrop={() => ref.current?.dismiss()}
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          {`Total points: ${points}PTS`}
        </Text>
        <Card>
          <VStack
            className='p-4'
            space='md'
          >
            {(Array.from(Object.keys(unitDetail)) as Unit['type'][]).map(
              (type) => {
                const category = unitDetail[type]

                if (!category.count) {
                  return null
                }
                return (
                  <Detail
                    key={type}
                    Icon={unitTypeToIcon[type]}
                    points={category.points}
                    text={`${category.count} ${pluralize('Unit', category.count)} (${category.models} ${pluralize('model', category.models)})`}
                    title={pluralize(type)}
                  />
                )
              }
            )}
          </VStack>
        </Card>
        {enhancementDetail.count ? (
          <Card>
            <VStack className='p-4'>
              <Detail
                Icon={CircleFadingPlus}
                points={enhancementDetail.points}
                text={`${enhancementDetail.count} selected`}
                title='Enhancements'
              />
            </VStack>
          </Card>
        ) : null}
      </VStack>
    </BottomSheet>
  )
}

type DetailProps = {
  Icon: LucideIcon
  points: number
  text: string
  title: string
}

const Detail = ({ Icon, points, text, title }: DetailProps) => (
  <HStack
    className='items-center'
    space='md'
  >
    <IconBadge Icon={Icon} />
    <VStack className='flex-1'>
      <Text
        className='uppercase'
        family='body-bold'
        size='sm'
      >
        {title}
      </Text>
      <HStack space='md'>
        <Text>{text}</Text>
        <Dots />
        <Text family='body-bold'>{`${points}PTS`}</Text>
      </HStack>
    </VStack>
  </HStack>
)

const baseUnitDetail = {
  character: {
    count: 0,
    models: 0,
    points: 0
  },
  leader: {
    count: 0,
    models: 0,
    points: 0
  },
  monster: {
    count: 0,
    models: 0,
    points: 0
  },
  squad: {
    count: 0,
    models: 0,
    points: 0
  },
  transport: {
    count: 0,
    models: 0,
    points: 0
  },
  vehicle: {
    count: 0,
    models: 0,
    points: 0
  }
}

export default memo(InfoBottomSheet)
