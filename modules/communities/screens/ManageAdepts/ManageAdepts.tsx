import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  EmptyListItem,
  Loading,
  NavigationHeader,
  PlayerTag,
  ScreenContainer,
  ScreenTitle,
  TableList,
  Text,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useGlobalSearchParams } from 'expo-router'
import { snakeCase } from 'lodash'
import { useRef, useState } from 'react'
import { useDeleteMemberMutation, useGetCommunityQuery } from '../../api'

const ManageAdeptsScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const [selectedUser, setSelectedUser] = useState('')

  const { data, isFetching } = useGetCommunityQuery(id)

  const [deleteMember, { isLoading }] = useDeleteMemberMutation()

  const ref = useRef<BottomSheetModalMethods>(null)

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <ScreenTitle>Manage adepts</ScreenTitle>
      <Text family='body-regular-italic'>
        Here you can view and manage community members. Check the list of adepts
        and remove them if needed.
      </Text>
      <Text
        className='uppercase'
        family='body-bold'
      >
        Adepts
      </Text>
      <TableList
        data={data?.members.filter(({ id }) => id !== user?.id)}
        keyExtractor={({ id }) => id}
        ListEmptyComponent={
          isFetching ? (
            <Loading />
          ) : (
            <VStack className='flex-1 items-center justify-center'>
              <EmptyListItem
                lottieSource={toxicFree}
                title='No members!'
                subtitle='Go back and invite more friends to join your community!'
              />
            </VStack>
          )
        }
        renderItem={({ item }) => (
          <>
            <PlayerTag player={item} />
            <Button
              onPress={() => {
                setSelectedUser(item.id)
                ref.current?.present()
              }}
              variant='callback'
              size='sm'
              text='Kick'
            />
          </>
        )}
      />
      <BottomSheet ref={ref}>
        <VStack space='md'>
          <Text
            className='text-center'
            family='body-bold'
          >
            Kick user
          </Text>
          <VStack space='md'>
            <Text>
              Are you sure to kick{' '}
              <Text family='body-bold'>
                {snakeCase(
                  data?.members.find(({ id }) => selectedUser === id)?.name
                )}
              </Text>{' '}
              from this community?
            </Text>
            <ButtonGroup>
              <Button
                className='flex-1'
                color='secondary'
                onPress={() => {
                  ref.current?.dismiss()
                }}
                variant='callback'
                text='Do not kick'
                size='sm'
                disabled={isLoading}
              />
              <Button
                onPress={async () => {
                  const res = await deleteMember({
                    communityId: Number(id),
                    memberId: selectedUser
                  })

                  if ('error' in res) {
                    return
                  }

                  ref.current?.dismiss()
                }}
                variant='callback'
                text='Kick'
                size='sm'
                disabled={isLoading}
              />
            </ButtonGroup>
          </VStack>
        </VStack>
      </BottomSheet>
    </ScreenContainer>
  )
}

export default ManageAdeptsScreen
