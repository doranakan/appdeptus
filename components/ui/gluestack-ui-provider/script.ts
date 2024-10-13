export const script = (theme: string, prev?: string) => {
  const documentElement = document.documentElement

  try {
    if (prev) {
      documentElement.classList.remove(prev)
    }
    documentElement.classList.add(theme)
    documentElement.style.colorScheme = theme
  } catch (e) {
    console.error(e)
  }
}
