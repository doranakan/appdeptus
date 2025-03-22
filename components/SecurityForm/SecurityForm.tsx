import { upperCase } from 'lodash'
import { TriangleAlert } from 'lucide-react-native'
import { memo, useState } from 'react'
import Button from '../Button'
import Card from '../Card'
import Input from '../Input'
import Text from '../Text'
import { VStack } from '../ui'

type SecurityFormProps = {
  onPress: () => Promise<void>
  securityFrase: string
  variant: 'account' | 'community'

  loading?: boolean
}

const SecurityForm = ({
  onPress,
  securityFrase,
  variant,
  loading
}: SecurityFormProps) => {
  const [frase, setFrase] = useState('')

  return (
    <Card>
      <VStack
        className='bg-tertiary-950 p-4'
        space='md'
      >
        <Text className='text-tertiary-100'>
          {`If your really want to delete your ${variant} type "`}
          <Text
            className='uppercase'
            family='body-bold'
          >
            {securityFrase}
          </Text>
          {'" below.'}
        </Text>
        <Input
          Icon={TriangleAlert}
          onChangeText={setFrase}
          value={frase}
        />
        <Text size='xs'>Make sure all letters are in UPPER CASE</Text>
        <Button
          variant='callback'
          onPress={onPress}
          text='delete'
          disabled={frase !== upperCase(securityFrase) || loading}
          loading={loading}
        />
      </VStack>
    </Card>
  )
}

export default memo(SecurityForm)
