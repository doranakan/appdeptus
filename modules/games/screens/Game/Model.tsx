import clsx from 'clsx'
import { Minus, Plus, Skull } from 'lucide-react-native'
import React, { memo, useState } from 'react'
import Button from '../../../../components/Button'
import ButtonGroup from '../../../../components/ButtonGroup'
import Card from '../../../../components/Card'
import Text from '../../../../components/Text'
import { HStack, Icon, Pressable, VStack } from '../../../../components/ui'

type ModelProps = {
  index: number
  killed: boolean
  onPressMinus: (wounds: number) => void
  onPressPlus: (wounds: number) => void
  onPressSkull: (killed: boolean) => void
  wounds: number

  editable?: boolean
}

const Model = ({
  index,
  killed,
  onPressMinus,
  onPressPlus,
  onPressSkull,
  wounds,

  editable
}: ModelProps) => {
  const [sufferedWounds, setSufferedWounds] = useState(wounds)

  const [dead, setDead] = useState(killed)

  return (
    <HStack
      className='items-center'
      space='md'
    >
      <VStack className='flex-1'>
        <Card variant={dead ? 'disabled' : 'default'}>
          <HStack
            className='items-center justify-between p-4'
            space='md'
          >
            <VStack space='md'>
              <Text family='body-bold'>{`Model ${index + 1}`}</Text>
              <Text>{`${sufferedWounds} wounds suffered`}</Text>
            </VStack>

            {editable ? (
              <ButtonGroup>
                <Button
                  disabled={dead}
                  onPress={() => {
                    setSufferedWounds((prev) => {
                      const w = prev + 1

                      onPressPlus(w)

                      return w
                    })
                  }}
                  variant='callback'
                  size='sm'
                  icon={Plus}
                />
                <Button
                  disabled={dead || !sufferedWounds}
                  onPress={() => {
                    setSufferedWounds((prev) => {
                      const w = prev - 1

                      onPressMinus(w)

                      return w
                    })
                  }}
                  variant='callback'
                  size='sm'
                  icon={Minus}
                />
              </ButtonGroup>
            ) : null}
          </HStack>
        </Card>
      </VStack>
      {editable ? (
        <VStack className='px-4'>
          <Pressable
            onPress={() => {
              setDead((prev) => {
                const k = !prev

                onPressSkull(k)

                return k
              })
            }}
            hitSlop={24}
          >
            <Icon
              as={Skull}
              className={clsx(dead ? 'text-tertiary-600' : 'text-tertiary-50')}
              size='xl'
            />
          </Pressable>
        </VStack>
      ) : null}
    </HStack>
  )
}

export default memo(Model)
