import { type BaseQueryFn, type EndpointBuilder } from '@reduxjs/toolkit/query'

type CoreEndpointBuilder<T extends string = never> = EndpointBuilder<
  BaseQueryFn,
  T,
  'coreApi'
>

type NotificationsEndpointBuilder<T extends string = never> = EndpointBuilder<
  BaseQueryFn,
  T,
  'notificationsApi'
>

type SessionEndpointBuilder<T extends string = never> = EndpointBuilder<
  BaseQueryFn,
  T,
  'sessionApi'
>

export type {
  CoreEndpointBuilder,
  NotificationsEndpointBuilder,
  SessionEndpointBuilder
}
