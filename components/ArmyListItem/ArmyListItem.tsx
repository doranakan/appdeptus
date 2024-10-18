import { type CodexName } from 'appdeptus/models'
import clsx from 'clsx'
import { Image } from 'expo-image'
import { snakeCase } from 'lodash'
import { type ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import Card from '../Card'
import Text from '../Text'
import { HStack, themeColors, VStack } from '../ui'

type ArmyListItemProps = {
  codex: CodexName
  name: string
  points: number
  variant: ComponentProps<typeof Card>['variant']
}

const ArmyListItem = ({ codex, name, points, variant }: ArmyListItemProps) => (
  <Card variant={variant}>
    <Image
      source={snakeCase(codex)}
      style={styles.image}
    />
    <VStack
      className={clsx(
        'absolute h-full w-full',
        variant === 'selected' ? 'opacity-40' : 'opacity-60'
      )}
      style={{
        backgroundColor: themeColors[codex].primary[900]
      }}
    />
    <VStack
      className='p-4'
      space='sm'
    >
      <HStack className='items-center justify-between'>
        <Text
          className='uppercase text-typography-50'
          family='body-bold'
          size='lg'
        >
          {codex}
        </Text>
        <Text
          className='uppercase text-typography-50'
          family='body-bold'
          size='lg'
        >
          {`${points} pts`}
        </Text>
      </HStack>
      <HStack className='items-center justify-between'>
        <Text className='text-typography-50'>{name}</Text>
      </HStack>
    </VStack>
  </Card>
)

const styles = StyleSheet.create({
  image: { position: 'absolute', width: '100%', height: '100%' }
})

export default ArmyListItem
