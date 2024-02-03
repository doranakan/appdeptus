import { EndpointBuilder, BaseQueryFn } from '@reduxjs/toolkit/query'

type SupabaseEndpointBuilder<T extends string = never> = EndpointBuilder<
  BaseQueryFn,
  T,
  'supabaseApi'
>

export type { SupabaseEndpointBuilder }
