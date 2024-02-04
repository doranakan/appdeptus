type Unit = {
  id: string
  name: string
  caption?: string
  leader: boolean
  limit: number
  tiers: {
    id: string
    points: number
  }[]
}

export type { Unit }
