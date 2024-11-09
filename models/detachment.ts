type Detachment = {
  id: number
  name: string
  enhancements: Enhancement[]
}

type Enhancement = {
  id: number
  name: string
  points: number
}

export type { Detachment, Enhancement }
