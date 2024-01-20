import { Comfortaa } from 'next/font/google'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material'
import theme from '../config/theme'

const comfortaa = Comfortaa({ subsets: ['latin'] })

export const metadata = {
  title: 'BrightHR Tech Test',
  description: 'BrightHR Tect Test - Made by Luke Fox',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
