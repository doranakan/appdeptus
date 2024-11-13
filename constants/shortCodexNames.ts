import { type CodexName } from 'appdeptus/models'

const shortCodexNames = {
  'Adepta Sororitas': 'sor',
  'Adeptus Custodes': 'cus',
  'Adeptus Mechanicus': 'mec',
  Aeldari: 'ael',
  'Astra Militarum': 'aml',
  'Black Templars': 'blt',
  'Blood Angels': 'bla',
  'Chaos Daemons': 'dae',
  'Chaos Knights': 'ckn',
  'Chaos Space Marines': 'csm',
  'Dark Angels': 'dan',
  'Death Guard': 'dtg',
  Drukhari: 'dru',
  "Emperor's Children": 'chi',
  'Genestealer Cults': 'gsc',
  'Grey Knights': 'gkn',
  'Imperial Agents': 'age',
  'Imperial Knights': 'ikn',
  'Leagues Of Votann': 'lov',
  Necrons: 'nec',
  Orks: 'ork',
  'Space Marines': 'spm',
  'Space Wolves': 'wol',
  "T'au Empire": 'tau',
  'Thousand Sons': 'ths',
  Tyranids: 'tyr',
  'World Eaters': 'wre'
} as const satisfies Record<CodexName, string>

export default shortCodexNames
