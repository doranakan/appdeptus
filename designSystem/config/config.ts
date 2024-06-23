import { AnimationResolver } from '@gluestack-style/animation-resolver'
import { MotiAnimationDriver } from '@gluestack-style/moti-animation-driver'
import { createConfig } from '@gluestack-style/react'
import { config as GSConfig } from '@gluestack-ui/config'
import { CodexName } from 'appdeptus/models'
import { merge } from 'lodash'

const config = createConfig(
  merge(GSConfig, {
    // ------------------ COMPONENTS 🧰
    components: {
      Button: {
        theme: {
          ':disabled': {
            opacity: '$60'
          },
          _text: {
            fontFamily: 'NotoSerif'
          },
          borderRadius: '$0',
          variants: {
            action: {
              negative: {
                _text: {
                  color: '$white'
                },
                bg: '$secondary300',
                ':active': {
                  bg: '$secondary300',
                  opacity: '$80',
                  _text: {
                    color: '$white'
                  }
                }
              }
            }
          }
        }
      },
      Heading: {
        theme: {
          fontFamily: 'Grenze'
        }
      },
      Pressable: {
        theme: {
          ':active': {
            opacity: '$80'
          },
          ':disabled': {
            opacity: '$60'
          }
        }
      },
      Text: {
        theme: {
          fontFamily: 'NotoSerif'
        }
      }
    },
    // ------------------ PLUGINS 💽
    plugins: [new AnimationResolver(MotiAnimationDriver)],
    // ------------------ BASE TOKENS 🟥🟩🟦
    tokens: {
      colors: {
        primary50: '#FBE9ED',
        primary100: '#F8D3DB',
        primary200: '#F0A8B8',
        primary300: '#E97C94',
        primary400: '#E15170',
        primary500: '#DA274D',
        primary600: '#AE1E3D',
        primary700: '#83162E',
        primary800: '#570F1F',
        primary900: '#2C070F',
        primary950: '#160408',

        secondary50: '#E7ECF3',
        secondary100: '#D3DBE9',
        secondary200: '#A7B8D3',
        secondary300: '#7791BB',
        secondary400: '#506F9F',
        secondary500: '#3A5073',
        secondary600: '#2E405C',
        secondary700: '#222F44',
        secondary800: '#18212F',
        secondary900: '#0C1018',
        secondary950: '#05070A',

        success50: '#EDF3E7',
        success100: '#DEE9D3',
        success200: '#BBD1A3',
        success300: '#9ABB77',
        success400: '#79A04F',
        success500: '#577339',
        success600: '#465C2E',
        success700: '#344422',
        success800: '#222C16',
        success900: '#12180C',
        success950: '#080A05'
      }
    },
    // ------------------ COLOR MODES 🌞🌙
    themes: {
      // ------------------ ADEPTA_SORORITAS ⚜️
      [CodexName.ADEPTA_SORORITAS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFD6D7',
          primary100: '#FFADAF',
          primary200: '#FF5C5F',
          primary300: '#FF0A0E',
          primary400: '#BD0003',
          primary500: '#6A0001',
          primary600: '#570001',
          primary700: '#3D0001',
          primary800: '#290001',
          primary900: '#140000',
          primary950: '#0A0000',

          secondary50: '#E9E7E7',
          secondary100: '#D6D1D2',
          secondary200: '#ABA0A3',
          secondary300: '#827377',
          secondary400: '#51484A',
          secondary500: '#231F20',
          secondary600: '#1B1819',
          secondary700: '#161314',
          secondary800: '#0E0C0C',
          secondary900: '#080707',
          secondary950: '#030202'
        }
      },
      // ------------------ ADEPTUS_ASTARTES 👩🏼‍🚀
      [CodexName.ADEPTUS_ASTARTES]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FDF9F2',
          primary100: '#FAF1E0',
          primary200: '#F6E5C6',
          primary300: '#F1D7A7',
          primary400: '#EDCB8C',
          primary500: '#E8BC6D',
          primary600: '#DFA334',
          primary700: '#B07C1C',
          primary800: '#775413',
          primary900: '#392809',
          primary950: '#1F1605',

          secondary50: '#DFECFC',
          secondary100: '#BED8F8',
          secondary200: '#79AFF1',
          secondary300: '#3888EB',
          secondary400: '#1462C2',
          secondary500: '#0D407F',
          secondary600: '#0A3466',
          secondary700: '#08284F',
          secondary800: '#051A33',
          secondary900: '#030E1C',
          secondary950: '#01070E'
        }
      },
      // ------------------ ADEPTUS_MECHANICUS ⚙️
      [CodexName.ADEPTUS_MECHANICUS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FCE4E5',
          primary100: '#F9CDCF',
          primary200: '#F2979A',
          primary300: '#EB656A',
          primary400: '#E42F35',
          primary500: '#C2191F',
          primary600: '#9A1418',
          primary700: '#750F13',
          primary800: '#4D0A0C',
          primary900: '#290506',
          primary950: '#120203',

          secondary50: '#F4F5F6',
          secondary100: '#EBEEEF',
          secondary200: '#D8DCDF',
          secondary300: '#C3CACE',
          secondary400: '#A2ADB3',
          secondary500: '#83929A',
          secondary600: '#67767E',
          secondary700: '#4E595F',
          secondary800: '#323A3E',
          secondary900: '#191D1F',
          secondary950: '#0E1011'
        }
      },
      // ------------------ AELDARI 🪄
      [CodexName.AELDARI]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FBE9ED',
          primary100: '#F8D3DB',
          primary200: '#F0A8B8',
          primary300: '#E97C94',
          primary400: '#E15170',
          primary500: '#DA274D',
          primary600: '#AE1E3D',
          primary700: '#83162E',
          primary800: '#570F1F',
          primary900: '#2C070F',
          primary950: '#160408',

          secondary50: '#E5F7FA',
          secondary100: '#C8EEF4',
          secondary200: '#95DEEA',
          secondary300: '#5DCEDF',
          secondary400: '#29BAD0',
          secondary500: '#1F8C9C',
          secondary600: '#196E7B',
          secondary700: '#13545E',
          secondary800: '#0D3940',
          secondary900: '#061B1E',
          secondary950: '#030F11'
        }
      },
      // ------------------ ASTRA_MILITARUM 🪖
      [CodexName.ASTRA_MILITARUM]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F9F4F0',
          primary100: '#F4E9E2',
          primary200: '#E7D0C1',
          primary300: '#DBBBA3',
          primary400: '#D0A586',
          primary500: '#C38C65',
          primary600: '#B77647',
          primary700: '#885735',
          primary800: '#5C3B24',
          primary900: '#2C1C11',
          primary950: '#160E09',

          secondary50: '#F1F4E7',
          secondary100: '#E3E8CE',
          secondary200: '#C7D29E',
          secondary300: '#ABBB6D',
          secondary400: '#899947',
          secondary500: '#5C6730',
          secondary600: '#4B5327',
          secondary700: '#383F1D',
          secondary800: '#252A13',
          secondary900: '#13150A',
          secondary950: '#090A05'
        }
      },
      // ------------------ BLACK_TEMPLARS ✠
      [CodexName.BLACK_TEMPLARS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#E9E7E7',
          primary100: '#D6D1D2',
          primary200: '#ABA0A3',
          primary300: '#827377',
          primary400: '#51484A',
          primary500: '#231F20',
          primary600: '#1B1819',
          primary700: '#161314',
          primary800: '#0E0C0C',
          primary900: '#080707',
          primary950: '#030202',

          secondary50: '#F4F5F6',
          secondary100: '#EBEEEF',
          secondary200: '#D8DCDF',
          secondary300: '#C3CACE',
          secondary400: '#A2ADB3',
          secondary500: '#83929A',
          secondary600: '#67767E',
          secondary700: '#4E595F',
          secondary800: '#323A3E',
          secondary900: '#191D1F',
          secondary950: '#0E1011'
        }
      },
      // ------------------ BLOOD_ANGELS 🩸
      [CodexName.BLOOD_ANGELS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FDDEDE',
          primary100: '#FABCBD',
          primary200: '#F67A7C',
          primary300: '#F1373A',
          primary400: '#D10F12',
          primary500: '#8C0A0C',
          primary600: '#72080A',
          primary700: '#560607',
          primary800: '#390405',
          primary900: '#1D0202',
          primary950: '#0E0101',

          secondary50: '#FAF5EF',
          secondary100: '#F7EEE3',
          secondary200: '#EFDDC8',
          secondary300: '#E6CBAC',
          secondary400: '#DEBA91',
          secondary500: '#D6A875',
          secondary600: '#C78942',
          secondary700: '#99672E',
          secondary800: '#66451E',
          secondary900: '#33220F',
          secondary950: '#181007'
        }
      },
      // ------------------ BLOOD_RAVENS 🐦‍⬛
      [CodexName.BLOOD_RAVENS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FEFAF6',
          primary100: '#FDF8F2',
          primary200: '#FBEEE0',
          primary300: '#F9E7D2',
          primary400: '#F6DDC1',
          primary500: '#F4D5B2',
          primary600: '#E9AD67',
          primary700: '#DF8620',
          primary800: '#935815',
          primary900: '#4C2E0B',
          primary950: '#241505',

          secondary50: '#FDDEDE',
          secondary100: '#FABCBD',
          secondary200: '#F67A7C',
          secondary300: '#F1373A',
          secondary400: '#D10F12',
          secondary500: '#8C0A0C',
          secondary600: '#72080A',
          secondary700: '#560607',
          secondary800: '#390405',
          secondary900: '#1D0202',
          secondary950: '#0E0101'
        }
      },
      // ------------------ CHAOS_DAEMONS 👾
      [CodexName.CHAOS_DAEMONS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFF1E5',
          primary100: '#FFE7D1',
          primary200: '#FFCEA3',
          primary300: '#FFB675',
          primary400: '#FF9D47',
          primary500: '#FF8418',
          primary600: '#E06900',
          primary700: '#A84F00',
          primary800: '#703400',
          primary900: '#381A00',
          primary950: '#190C00',

          secondary50: '#FCD9DA',
          secondary100: '#F9B3B6',
          secondary200: '#F46C71',
          secondary300: '#EE2127',
          secondary400: '#AF0E13',
          secondary500: '#67080B',
          secondary600: '#500609',
          secondary700: '#3E0507',
          secondary800: '#2B0305',
          secondary900: '#130102',
          secondary950: '#090101'
        }
      },
      // ------------------ CHAOS_SPACE_MARINES 💥
      [CodexName.CHAOS_SPACE_MARINES]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#E8E8E8',
          primary100: '#D1D1D1',
          primary200: '#A1A1A1',
          primary300: '#737373',
          primary400: '#454545',
          primary500: '#161616',
          primary600: '#121212',
          primary700: '#0D0D0D',
          primary800: '#080808',
          primary900: '#050505',
          primary950: '#030303',

          secondary50: '#FCF7F3',
          secondary100: '#F8EDE3',
          secondary200: '#F0DBC6',
          secondary300: '#E9C8AA',
          secondary400: '#E3B992',
          secondary500: '#DBA674',
          secondary600: '#CE8541',
          secondary700: '#9E6129',
          secondary800: '#69411B',
          secondary900: '#35200E',
          secondary950: '#1C1107'
        }
      },
      // ------------------ DARK_ANGELS 🦁
      [CodexName.DARK_ANGELS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFD6DA',
          primary100: '#FFADB6',
          primary200: '#FF5768',
          primary300: '#FF051E',
          primary400: '#B30012',
          primary500: '#5D0009',
          primary600: '#4D0008',
          primary700: '#380006',
          primary800: '#240004',
          primary900: '#140002',
          primary950: '#0A0001',

          secondary50: '#D1FFE7',
          secondary100: '#A8FFD2',
          secondary200: '#4DFFA3',
          secondary300: '#00F576',
          secondary400: '#00994A',
          secondary500: '#00401F',
          secondary600: '#003319',
          secondary700: '#002914',
          secondary800: '#00190C',
          secondary900: '#000F07',
          secondary950: '#000502'
        }
      },
      // ------------------ DEATHWATCH 👮🏼‍♀️
      [CodexName.DEATHWATCH]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F4F5F6',
          primary100: '#EBEEEF',
          primary200: '#D8DCDF',
          primary300: '#C3CACE',
          primary400: '#A2ADB3',
          primary500: '#83929A',
          primary600: '#67767E',
          primary700: '#4E595F',
          primary800: '#323A3E',
          primary900: '#191D1F',
          primary950: '#0E1011',

          secondary50: '#F0EBEB',
          secondary100: '#DED3D3',
          secondary200: '#BEA7A7',
          secondary300: '#9D7B7B',
          secondary400: '#755757',
          secondary500: '#4C3838',
          secondary600: '#1F1717',
          secondary700: '#171111',
          secondary800: '#0F0B0B',
          secondary900: '#090707',
          secondary950: '#030202'
        }
      },
      // ------------------ DEATH_GUARD 🦠
      [CodexName.DEATH_GUARD]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F6F6F3',
          primary100: '#EAEBE5',
          primary200: '#D6D8CA',
          primary300: '#C3C7B3',
          primary400: '#AFB398',
          primary500: '#9AA07E',
          primary600: '#848A66',
          primary700: '#62674C',
          primary800: '#434634',
          primary900: '#22231A',
          primary950: '#11120D',

          secondary50: '#F9F4F0',
          secondary100: '#F4E9E2',
          secondary200: '#E7D0C1',
          secondary300: '#DBBBA3',
          secondary400: '#D0A586',
          secondary500: '#C38C65',
          secondary600: '#B77647',
          secondary700: '#885735',
          secondary800: '#5C3B24',
          secondary900: '#2C1C11',
          secondary950: '#160E09'
        }
      },
      // ------------------ DRUKHARI 💉
      [CodexName.DRUKHARI]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#E0F9FA',
          primary100: '#C1F3F6',
          primary200: '#83E7ED',
          primary300: '#45DBE3',
          primary400: '#1DBBC3',
          primary500: '#14848A',
          primary600: '#0B474A',
          primary700: '#09373A',
          primary800: '#052224',
          primary900: '#031112',
          primary950: '#010909',

          secondary50: '#C3FEEE',
          secondary100: '#87FCDD',
          secondary200: '#0FFABB',
          secondary300: '#038C67',
          secondary400: '#037859',
          secondary500: '#02644A',
          secondary600: '#02503B',
          secondary700: '#013C2C',
          secondary800: '#01281E',
          secondary900: '#00140F',
          secondary950: '#000A07'
        }
      },
      // ------------------ GENESTEALER_CULTS 👽
      [CodexName.GENESTEALER_CULTS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FAEBF4',
          primary100: '#F6DAEA',
          primary200: '#ECB1D3',
          primary300: '#E38DBF',
          primary400: '#D864A8',
          primary500: '#CF3E92',
          primary600: '#AC2B76',
          primary700: '#83205A',
          primary800: '#56153B',
          primary900: '#2D0B1F',
          primary950: '#14050E',

          secondary50: '#F1E2F8',
          secondary100: '#E3C5F2',
          secondary200: '#C78AE5',
          secondary300: '#AD54D9',
          secondary400: '#8B2ABB',
          secondary500: '#601D81',
          secondary600: '#4D1768',
          secondary700: '#3B124F',
          secondary800: '#250B32',
          secondary900: '#130619',
          secondary950: '#09030C'
        }
      },
      // ------------------ GREY_KNIGHTS 📖
      [CodexName.GREY_KNIGHTS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F4F5F6',
          primary100: '#EBEEEF',
          primary200: '#D8DCDF',
          primary300: '#C3CACE',
          primary400: '#A2ADB3',
          primary500: '#83929A',
          primary600: '#67767E',
          primary700: '#4E595F',
          primary800: '#323A3E',
          primary900: '#191D1F',
          primary950: '#0E1011',

          secondary50: '#EAECF5',
          secondary100: '#D6D8EB',
          secondary200: '#ADB2D7',
          secondary300: '#8289C2',
          secondary400: '#616BB2',
          secondary500: '#4B549A',
          secondary600: '#3C447B',
          secondary700: '#2D335D',
          secondary800: '#1E223E',
          secondary900: '#0F111F',
          secondary950: '#080911'
        }
      },
      // ------------------ IMPERIAL_FISTS ✊🏼
      [CodexName.IMPERIAL_FISTS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFFDD6',
          primary100: '#FFFBA8',
          primary200: '#FFF757',
          primary300: '#FFF200',
          primary400: '#DBD000',
          primary500: '#B8AE00',
          primary600: '#948D00',
          primary700: '#6B6600',
          primary800: '#474400',
          primary900: '#242200',
          primary950: '#141300',

          secondary50: '#F0F0EF',
          secondary100: '#E2E2DF',
          secondary200: '#C4C4BF',
          secondary300: '#A8A8A0',
          secondary400: '#919187',
          secondary500: '#7A7A70',
          secondary600: '#63635A',
          secondary700: '#4B4B44',
          secondary800: '#30302C',
          secondary900: '#181816',
          secondary950: '#0D0D0C'
        }
      },
      // ------------------ INQUISITION 🕵🏼
      [CodexName.INQUISITION]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F9D6D2',
          primary100: '#F2ACA6',
          primary200: '#E55548',
          primary300: '#AE2519',
          primary400: '#932015',
          primary500: '#7D1B12',
          primary600: '#62150E',
          primary700: '#4C100B',
          primary800: '#310B07',
          primary900: '#1B0604',
          primary950: '#0D0302',

          secondary50: '#EBE1E0',
          secondary100: '#D9C6C4',
          secondary200: '#B48C89',
          secondary300: '#845854',
          secondary400: '#704B47',
          secondary500: '#5D3E3C',
          secondary600: '#4B3230',
          secondary700: '#382524',
          secondary800: '#251918',
          secondary900: '#130C0C',
          secondary950: '#090606'
        }
      },
      // ------------------ NECRONS 💀
      [CodexName.NECRONS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F2FAEB',
          primary100: '#E6F4D7',
          primary200: '#CCEAAE',
          primary300: '#B3DF86',
          primary400: '#96D459',
          primary500: '#7DC734',
          primary600: '#639E29',
          primary700: '#4D7920',
          primary800: '#335115',
          primary900: '#1A280B',
          primary950: '#0D1405',

          secondary50: '#D5EBD7',
          secondary100: '#A8D6AB',
          secondary200: '#52AD58',
          secondary300: '#2A592D',
          secondary400: '#244C27',
          secondary500: '#1D3E20',
          secondary600: '#19341A',
          secondary700: '#122613',
          secondary800: '#0B180C',
          secondary900: '#070E07',
          secondary950: '#030704'
        }
      },
      // ------------------ ORKS 🐸
      [CodexName.ORKS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#F0F5F1',
          primary100: '#E0EBE4',
          primary200: '#BED5C6',
          primary300: '#9FC1AA',
          primary400: '#7DAB8C',
          primary500: '#5F9370',
          primary600: '#4C765A',
          primary700: '#3A5A45',
          primary800: '#263B2D',
          primary900: '#141F18',
          primary950: '#0A0F0C',

          secondary50: '#EAF5EF',
          secondary100: '#D2E9DD',
          secondary200: '#A9D5BE',
          secondary300: '#7CC09C',
          secondary400: '#53AC7D',
          secondary500: '#3E805D',
          secondary600: '#32674B',
          secondary700: '#254C37',
          secondary800: '#193425',
          secondary900: '#0C1811',
          secondary950: '#070E0A'
        }
      },
      // ------------------ SPACE_WOLVES 🐺
      [CodexName.SPACE_WOLVES]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFF8EB',
          primary100: '#FFF0D2',
          primary200: '#FEE3A9',
          primary300: '#FED57C',
          primary400: '#FDC853',
          primary500: '#FDB825',
          primary600: '#E8A002',
          primary700: '#AC7602',
          primary800: '#745001',
          primary900: '#382601',
          primary950: '#1E1500',

          secondary50: '#ECF1F4',
          secondary100: '#D5E0E7',
          secondary200: '#ABC1CE',
          secondary300: '#84A4B8',
          secondary400: '#5B859E',
          secondary500: '#436174',
          secondary600: '#364F5E',
          secondary700: '#293C47',
          secondary800: '#1A262D',
          secondary900: '#0D1317',
          secondary950: '#070B0D'
        }
      },
      // ------------------ TAU 🐟
      [CodexName.TAU]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FBF0E4',
          primary100: '#F8E3CE',
          primary200: '#F0C499',
          primary300: '#E8A868',
          primary400: '#E08A33',
          primary500: '#BF6E1D',
          primary600: '#975717',
          primary700: '#734212',
          primary800: '#4B2B0B',
          primary900: '#281706',
          primary950: '#120A03',

          secondary50: '#F6E9E9',
          secondary100: '#ECD0D0',
          secondary200: '#DBA4A4',
          secondary300: '#C87474',
          secondary400: '#B74848',
          secondary500: '#883636',
          secondary600: '#6E2B2B',
          secondary700: '#502020',
          secondary800: '#371616',
          secondary900: '#1A0A0A',
          secondary950: '#0F0606'
        }
      },
      // ------------------ THOUSAND_SONS ✨
      [CodexName.THOUSAND_SONS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FDF9F2',
          primary100: '#FAF1E0',
          primary200: '#F6E5C6',
          primary300: '#F1D7A7',
          primary400: '#EDCB8C',
          primary500: '#E8BC6D',
          primary600: '#DFA334',
          primary700: '#B07C1C',
          primary800: '#775413',
          primary900: '#392809',
          primary950: '#1F1605',

          secondary50: '#EBF3FA',
          secondary100: '#D6E7F5',
          secondary200: '#AACCE9',
          secondary300: '#81B3DF',
          secondary400: '#5498D4',
          secondary500: '#317EC1',
          secondary600: '#27659B',
          secondary700: '#1E4D76',
          secondary800: '#14324D',
          secondary900: '#0A1B29',
          secondary950: '#050D14'
        }
      },
      // ------------------ TYRANIDS 🦟
      [CodexName.TYRANIDS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FEF6F9',
          primary100: '#FDEDF4',
          primary200: '#FBE0EB',
          primary300: '#F8CEE0',
          primary400: '#F6C0D8',
          primary500: '#F4AFCD',
          primary600: '#EA67A0',
          primary700: '#DC1E70',
          primary800: '#94144C',
          primary900: '#480A25',
          primary950: '#240512',

          secondary50: '#EDE0F5',
          secondary100: '#DEC5EC',
          secondary200: '#BD8CD9',
          secondary300: '#9C52C7',
          secondary400: '#74329A',
          secondary500: '#471F5F',
          secondary600: '#3A194D',
          secondary700: '#2B133A',
          secondary800: '#1D0D26',
          secondary900: '#0E0613',
          secondary950: '#060308'
        }
      },
      // ------------------ WORLD EATERS 😡
      [CodexName.WORLD_EATERS]: {
        ...GSConfig.tokens,
        colors: {
          ...GSConfig.tokens.colors,
          primary50: '#FFD6D7',
          primary100: '#FFADAF',
          primary200: '#FF5C5F',
          primary300: '#FF0A0E',
          primary400: '#BD0003',
          primary500: '#6A0001',
          primary600: '#570001',
          primary700: '#3D0001',
          primary800: '#290001',
          primary900: '#140000',
          primary950: '#0A0000',

          secondary50: '#F7F2ED',
          secondary100: '#F1E7DF',
          secondary200: '#E2D0C0',
          secondary300: '#D4B8A0',
          secondary400: '#C6A180',
          secondary500: '#B7885F',
          secondary600: '#9B6D46',
          secondary700: '#745234',
          secondary800: '#4D3723',
          secondary900: '#271B11',
          secondary950: '#120C08'
        }
      }
    }
  } as const)
) as typeof GSConfig & {
  themes: Record<
    CodexName,
    {
      colors: Record<keyof typeof GSConfig.tokens.colors, string>
    }
  >
}

export default config
