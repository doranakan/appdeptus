'use client'
import { setFlushStyles } from '@gluestack-ui/nativewind-utils/flush'
import { OverlayProvider } from '@gluestack-ui/overlay'
import { ToastProvider } from '@gluestack-ui/toast'
import { useMount, usePrevious } from 'ahooks'
import { selectThemeName, type ThemeName } from 'appdeptus/components/store'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { config } from './config'
import { script } from './script'

const variableStyleTagId = 'nativewind-style'
const createStyle = (styleTagId: string) => {
  const style = document.createElement('style')
  style.id = styleTagId
  style.appendChild(document.createTextNode(''))
  return style
}

export const useSafeLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const GluestackUIProvider = (props: { children?: React.ReactNode }) => {
  const theme = useSelector(selectThemeName)

  const prevTheme = usePrevious(theme)

  let cssVariablesWithMode = ''

  Object.keys(config).forEach((configKey) => {
    cssVariablesWithMode += `\n.${configKey} {\n `

    const cssVariables = Object.keys(config[configKey as ThemeName]).reduce(
      (acc: string, curr: string) => {
        acc += `${curr}:${config[configKey as ThemeName][curr]}; `
        return acc
      },
      ''
    )

    cssVariablesWithMode += `${cssVariables} \n}`
  })

  useMount(() => {
    setFlushStyles(cssVariablesWithMode)
  })

  const handleMediaQuery = React.useCallback(() => {
    script(theme, prevTheme)
  }, [prevTheme, theme])

  useSafeLayoutEffect(() => {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.classList.add(theme)
      if (prevTheme) {
        documentElement.classList.remove(prevTheme)
      }
      documentElement.style.colorScheme = theme
    }
  }, [theme])

  useSafeLayoutEffect(() => {
    const media = window.matchMedia(`(prefers-color-scheme: ${theme})`)

    media.addListener(handleMediaQuery)

    return () => {
      media.removeListener(handleMediaQuery)
    }
  }, [handleMediaQuery])

  useSafeLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const documentElement = document.documentElement
      if (documentElement) {
        const head = documentElement.querySelector('head')
        let style = head?.querySelector(`[id='${variableStyleTagId}']`)
        if (!style) {
          style = createStyle(variableStyleTagId)
          style.innerHTML = cssVariablesWithMode
          if (head) head.appendChild(style)
        }
      }
    }
  }, [])

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})('${theme}')`
        }}
      />
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  )
}

export { GluestackUIProvider }
