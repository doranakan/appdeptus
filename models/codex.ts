import { type codexes } from 'appdeptus/constants'

type Codex = {
  id: string
  name: CodexName
}

type CodexName = (typeof codexes)[number]

export type { Codex, CodexName }
