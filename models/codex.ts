import { type codexes, type factions } from 'appdeptus/constants'

type Codex = {
  id: string
  name: CodexName
  faction: Faction
}

type CodexName = (typeof codexes)[number]

type Faction = (typeof factions)[number]

export type { Codex, CodexName }
