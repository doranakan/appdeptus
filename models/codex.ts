import { type codexes, type factions } from 'appdeptus/constants'

type Codex = {
  id: number
  name: CodexName
  faction: Faction
  expansionOf?: Codex['id']
}

type CodexName = (typeof codexes)[number]

type Faction = (typeof factions)[number]

export type { Codex, CodexName }
