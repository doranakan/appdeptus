import { useDebounceEffect } from 'ahooks'
import {
  HStack,
  Icon,
  Input,
  NavigationHeader,
  ScreenTitle,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { lowerCase } from 'lodash'
import { CircleCheck, CircleX, Edit, Save } from 'lucide-react-native'
import React, { memo, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useLazySearchCommunityQuery } from '../../api'

type NameFormProps = {
  description: string
  onPress: (name: string) => Promise<void>
  title: string

  name?: string
  loading?: boolean
}

const NameForm = ({
  description,
  onPress,
  title,
  name: givenName = '',
  loading
}: NameFormProps) => {
  const [name, setName] = useState(givenName)

  const [checkedName, setCheckedName] = useState('')

  const [searchCommunity, { data, isFetching, isSuccess }] =
    useLazySearchCommunityQuery()

  const isValid = isSuccess && data === null && name === checkedName

  useDebounceEffect(
    () => {
      if (name.length && name !== checkedName && name !== givenName) {
        setCheckedName(name)
        searchCommunity(name)
      }
    },
    [name],
    {
      wait: 1000
    }
  )

  return (
    <>
      <NavigationHeader
        variant='backButton'
        rightButton={{
          onPress: async () => {
            await onPress(checkedName)
          },
          variant: 'callback',
          icon: Save,
          disabled: !isValid || isFetching || loading,
          loading
        }}
      />
      <ScreenTitle>{title}</ScreenTitle>
      <Text family='body-regular-italic'>{description}</Text>
      <VStack space='xs'>
        <Input
          Icon={Edit}
          onChangeText={(val) => {
            setName(lowerCase(val.replace(' ', '')))
          }}
          value={name}
        />
        <HStack
          className='items-center'
          space='md'
        >
          {isValid ? (
            <>
              <Icon
                as={CircleCheck}
                className='text-success-500'
              />
              <Text>
                <Text family='body-bold'>{checkedName}</Text> is a valid name.
              </Text>
            </>
          ) : name.length && name === checkedName && !isFetching ? (
            <>
              <Icon
                as={CircleX}
                className='text-tertiary-600'
              />
              <Text>
                <Text family='body-bold'>{checkedName}</Text> has been already
                taken.
              </Text>
            </>
          ) : name.length && name !== givenName ? (
            <ActivityIndicator
              size='small'
              color={themeColors.default.primary['300']}
            />
          ) : null}
        </HStack>
      </VStack>
    </>
  )
}

export default memo(NameForm)
