'use client'
import { type ThemeName } from 'appdeptus/components/store'
import { vars } from 'nativewind'
import colors, { type ColorVariant, type Shade } from './colors'

type GluestackUIConfig = Record<ThemeName, Record<string, string>>

const baseTokens = {
  /* Error */
  '--color-error-0': '254 233 233',
  '--color-error-50': '254 226 226',
  '--color-error-100': '254 202 202',
  '--color-error-200': '252 165 165',
  '--color-error-300': '248 113 113',
  '--color-error-400': '239 68 68',
  '--color-error-500': '230 53 53',
  '--color-error-600': '220 38 38',
  '--color-error-700': '185 28 28',
  '--color-error-800': '153 27 27',
  '--color-error-900': '127 29 29',
  '--color-error-950': '83 19 19',

  /* Success */
  '--color-success-0': '228 255 244',
  '--color-success-50': '202 255 232',
  '--color-success-100': '162 241 192',
  '--color-success-200': '132 211 162',
  '--color-success-300': '102 181 132',
  '--color-success-400': '72 151 102',
  '--color-success-500': '52 131 82',
  '--color-success-600': '42 121 72',
  '--color-success-700': '32 111 62',
  '--color-success-800': '22 101 52',
  '--color-success-900': '20 83 45',
  '--color-success-950': '27 50 36',

  /* Warning */
  '--color-warning-0': '255 253 251',
  '--color-warning-50': '255 249 245',
  '--color-warning-100': '255 231 213',
  '--color-warning-200': '254 205 170',
  '--color-warning-300': '253 173 116',
  '--color-warning-400': '251 149 75',
  '--color-warning-500': '231 120 40',
  '--color-warning-600': '215 108 31',
  '--color-warning-700': '180 90 26',
  '--color-warning-800': '130 68 23',
  '--color-warning-900': '108 56 19',
  '--color-warning-950': '84 45 18',

  /* Info */
  '--color-info-0': '236 248 254',
  '--color-info-50': '199 235 252',
  '--color-info-100': '162 221 250',
  '--color-info-200': '124 207 248',
  '--color-info-300': '87 194 246',
  '--color-info-400': '50 180 244',
  '--color-info-500': '13 166 242',
  '--color-info-600': '11 141 205',
  '--color-info-700': '9 115 168',
  '--color-info-800': '7 90 131',
  '--color-info-900': '5 64 93',
  '--color-info-950': '3 38 56',

  /* Typography */
  '--color-typography-0': '254 254 255',
  '--color-typography-50': '245 245 245',
  '--color-typography-100': '229 229 229',
  '--color-typography-200': '219 219 220',
  '--color-typography-300': '212 212 212',
  '--color-typography-400': '163 163 163',
  '--color-typography-500': '140 140 140',
  '--color-typography-600': '115 115 115',
  '--color-typography-700': '82 82 82',
  '--color-typography-800': '64 64 64',
  '--color-typography-900': '38 38 39',
  '--color-typography-950': '23 23 23',

  /* Outline */
  '--color-outline-0': '253 254 254',
  '--color-outline-50': '243 243 243',
  '--color-outline-100': '230 230 230',
  '--color-outline-200': '221 220 219',
  '--color-outline-300': '211 211 211',
  '--color-outline-400': '165 163 163',
  '--color-outline-500': '140 141 141',
  '--color-outline-600': '115 116 116',
  '--color-outline-700': '83 82 82',
  '--color-outline-800': '65 65 65',
  '--color-outline-900': '39 38 36',
  '--color-outline-950': '26 23 23',

  /* Background */
  '--color-background-0': '255 255 255',
  '--color-background-50': '246 246 246',
  '--color-background-100': '242 241 241',
  '--color-background-200': '220 219 219',
  '--color-background-300': '213 212 212',
  '--color-background-400': '162 163 163',
  '--color-background-500': '142 142 142',
  '--color-background-600': '116 116 116',
  '--color-background-700': '83 82 82',
  '--color-background-800': '65 64 64',
  '--color-background-900': '39 38 37',
  '--color-background-950': '24 23 24',

  /* Background Special */
  '--color-background-error': '254 241 241',
  '--color-background-warning': '255 244 235',
  '--color-background-success': '237 252 242',
  '--color-background-muted': '247 248 247',
  '--color-background-info': '235 248 254',

  /* Focus Ring Indicator  */
  '--color-indicator-primary': '55 55 55',
  '--color-indicator-info': '83 153 236',
  '--color-indicator-error': '185 28 28'
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1] ?? '', 16),
        g: parseInt(result[2] ?? '', 16),
        b: parseInt(result[3] ?? '', 16)
      }
    : null
}

const config = Object.keys(colors).reduce<GluestackUIConfig>(
  (completeConfig, themeName) => {
    const theme = Object.keys(colors[themeName as ThemeName]).reduce(
      (accTheme, variant) => {
        const newTheme = Object.keys(
          colors[themeName as ThemeName][variant as ColorVariant]
        ).reduce((accShade, shade) => {
          const rgbColor = hexToRgb(
            colors[themeName as ThemeName][variant as ColorVariant][
              shade as unknown as Shade
            ]
          )
          return {
            ...accShade,
            [`--color-${variant}-${shade}`]: `${rgbColor?.r} ${rgbColor?.g} ${rgbColor?.b}`
          }
        }, {})
        return { ...accTheme, ...newTheme }
      },
      {}
    )
    completeConfig[themeName as ThemeName] = vars({
      ...baseTokens,
      ...theme
    })
    return completeConfig
  },
  // @ts-expect-error :GluestackUIConfig
  {}
) as unknown as GluestackUIConfig

export { config }
