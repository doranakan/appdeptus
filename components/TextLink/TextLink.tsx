import { Link } from 'expo-router'
import { type PropsWithChildren } from 'react'
import Text from '../Text'

type TextLinkProps = {
  href: string
}

const TextLink = ({ children, href }: PropsWithChildren<TextLinkProps>) => (
  <Link href={href}>
    <Text
      className='underline'
      family='body-bold'
    >
      {children}
    </Text>
  </Link>
)

export default TextLink
