type Detachment = {
  id: number
  name: string
  enhancements: Enhancement[]
  detachmentPoints: number
}

type Enhancement = {
  id: number
  name: string
  points: number
}

export type { Detachment, Enhancement }
