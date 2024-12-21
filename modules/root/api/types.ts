type Provider = 'azure'

const isProvider = (provider: string): provider is Provider =>
  provider === 'azure'

export { isProvider }

export type { Provider }
