import { type CodexName } from 'appdeptus/models'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { Platform, StyleSheet, type ViewStyle } from 'react-native'
import { themeColors, VStack } from '../ui'
import Animated, { type AnimatedStyle } from 'react-native-reanimated'
type ArmyBackgroundProps = {
  codex: CodexName
  animatedOpacity?: AnimatedStyle<ViewStyle>
}
const ArmyBackground = ({ codex, animatedOpacity }: ArmyBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <Image
      source={source[codex]}
      style={styles.image}
      placeholder={
        Platform.OS === 'ios'
          ? { blurhash: blurhash[codex], isAnimated: true, cacheKey: source }
          : undefined
      }
      cachePolicy='memory-disk'
      transition={200}
    />
    <Animated.View
      className='absolute z-10 h-full w-full'
      style={[styles.gradientWrapper, animatedOpacity]}
    >
      <LinearGradient
        colors={[
          themeColors[codex].primary[800],
          themeColors[codex].tertiary[800]
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
    </Animated.View>
  </VStack>
)

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%'
  },
  image: { width: '100%', height: '100%' },
  gradientWrapper: { opacity: 0.8 }
})

const source = {
  'Adepta Sororitas': 'adepta_sororitas',
  'Adeptus Custodes': 'adeptus_custodes',
  'Adeptus Mechanicus': 'adeptus_mechanicus',
  Aeldari: 'aeldari',
  'Astra Militarum': 'astra_militarum',
  'Black Templars': 'black_templars',
  'Blood Angels': 'blood_angels',
  'Chaos Daemons': 'chaos_daemons',
  'Chaos Knights': 'chaos_knights',
  'Chaos Space Marines': 'chaos_space_marines',
  'Dark Angels': 'dark_angels',
  'Death Guard': 'death_guard',
  Drukhari: 'drukhari',
  "Emperor's Children": 'emperors_children',
  'Genestealer Cults': 'genestealer_cults',
  'Grey Knights': 'grey_knights',
  'Imperial Agents': 'imperial_agents',
  'Imperial Knights': 'imperial_knights',
  'Leagues Of Votann': 'leagues_of_votann',
  Necrons: 'necrons',
  Orks: 'orks',
  'Space Marines': 'space_marines',
  'Space Wolves': 'space_wolves',
  "T'au Empire": 'tau_empire',
  'Thousand Sons': 'thousand_sons',
  Tyranids: 'tyranids',
  'World Eaters': 'world_eaters'
} as const satisfies Record<CodexName, string>

const blurhash = {
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
