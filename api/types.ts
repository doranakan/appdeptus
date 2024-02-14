import { type BaseQueryFn, type EndpointBuilder } from '@reduxjs/toolkit/query'

type SupabaseEndpointBuilder<T extends string = never> = EndpointBuilder<
  BaseQueryFn,
  T,
  'supabaseApi'
>

export type { SupabaseEndpointBuilder }
