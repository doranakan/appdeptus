const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const pair = <T>(items: T[]): [T, T][] => {
  const pairs: [T, T][] = []
  for (let i = 0; i + 1 < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]])
  }
  return pairs
}

export { pair, shuffle }
