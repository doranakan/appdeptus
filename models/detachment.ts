type Detachment = {
  id: string
  name: string
  enhancements: Enhancement[]
}

type Enhancement = {
  id: string
  name: string
  points: number
}

export type { Detachment, Enhancement }
