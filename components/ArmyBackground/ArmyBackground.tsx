import { type CodexName } from 'appdeptus/models'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { snakeCase } from 'lodash'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
type ArmyBackgroundProps = {
  codex: CodexName
}
const ArmyBackground = ({ codex }: ArmyBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <Image
      source={snakeCase(codex.toLowerCase().replace("'", ''))}
      style={styles.image}
      placeholder={{
        blurhash: blurHash[codex],
        isAnimated: true,
        cacheKey: codex
      }}
      transition={500}
    />

    <LinearGradient
      colors={[
        themeColors[codex].primary[800],
        themeColors[codex].tertiary[800]
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    />
  </VStack>
)

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%', opacity: 0.8 },
  image: { position: 'absolute', width: '100%', height: '100%' }
})

const blurHash = {
  'Adepta Sororitas': 'L79??;%LD%D%?^%2v#Mx9axaM{ae',
  'Adeptus Custodes': 'L1Cru~bb0pt500s:00WB-,WV|:WB',
  'Adeptus Mechanicus': 'L9EnbisocYniG[xG}[NHE1ay9t$*',
  Aeldari: 'LHE;Dkxur?S$y?x]buV@D%MyV@iw',
  'Astra Militarum': 'L4FYMtpK?G_3%2WF_NNG00=r?vtR',
  'Black Templars': 'L0Dl+u9FD4t700%MyCjr00W=00kC',
  'Blood Angels': 'L8ExLx010L%e~oNK03^%XmOp58a0',
  'Chaos Daemons': 'L4A9{M:+?|yCuiMxvg-800ja4Qsq',
  'Chaos Knights': 'L4B2$6}tidNt00Rko{NHcDoy57-U',
  'Chaos Space Marines': 'L2A].=050MxuRQ0g~TE200%14UD+',
  'Dark Angels': 'L36+X-aj8y.jICkDVttQHubaNYVa',
  'Death Guard': 'L2CsNrrDD+r=IAv}NH~V00-:00M|',
  Drukhari: 'LSC@1qRjIoo300xu-:NG_LRjE1of',
  "Emperor's Children": 'L3E296ELPU0f^QJQ1Hw0019Z00~C',
  'Genestealer Cults': 'L68r,gyW4TO=.kiIDkR7?uH@DQkp',
  'Grey Knights': 'LMBhDzWBDOj]*JozH?WBE1aeR5f7',
  'Imperial Agents': 'LNBNf*RPozx]_Njsay%Mx]x]RPoz',
  'Imperial Knights': 'L28O3c1A+ZHXHYHrFz~p$w#jIqI]',
  'Leagues Of Votann': 'LFB#Yf~pozVsTKyY%1t6008_M{kX',
  Necrons: 'LEABwZtlD,Vs?tadICWE?@WBDQf8',
  Orks: 'LBGbeZ-4~U$|H?Md-n?G?v9GxWIU',
  'Space Marines': 'L8BguBvL01yXyq.6q]j=HYqF?DMK',
  'Space Wolves': 'L7GJW$00^a0nzn01~pxtzT00%Lnh',
  "T'au Empire": 'LLKnMBIAWERj~qngt7M{_NIUxaay',
  'Thousand Sons': 'L6DJkt9c_N9anL9Gt5j[4o%24Tn$',
  Tyranids: 'LHJaJ|Vx-.E1~Vt6%LRjMN9H-.W-',
  'World Eaters': 'L2CO~_V@5n}XMKaep^tR0MxD0fs:'
} as const satisfies Record<CodexName, string>

export default memo(ArmyBackground)
