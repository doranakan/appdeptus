type CodexName =
  | 'Adepta Sororitas'
  | 'Adeptus Custodes'
  | 'Adeptus Mechanicus'
  | 'Aeldari'
  | 'Agents of the Imperium'
  | 'Astra Militarum'
  | 'Black Templars'
  | 'Blood Angels'
  | 'Chaos Daemons'
  | 'Chaos Space Marines'
  | 'Dark Angels'
  | 'Death Guard'
  | 'Drukhari'
  | 'Genestealer Cults'
  | 'Grey Knights'
  | 'Leagues of Votann'
  | 'Necrons'
  | 'Orks'
  | 'Space Marines'
  | 'Space Wolves'
  | "T'Au Empire"
  | 'Thousand Sons'
  | 'Tyranids'
  | 'World Eaters'

type Codex = {
  id: string
  name: CodexName
}

export type { Codex, CodexName }
