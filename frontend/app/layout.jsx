// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { ColorSchemeScript, Container } from '@mantine/core'
import { Inter } from 'next/font/google'

import './global.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'A Rock Paper Scissors Game'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Container
            size="45rem"
            p="xs"
            h="100%"
          >
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
