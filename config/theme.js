'use client'

import { Comfortaa } from 'next/font/google'
import { createTheme, responsiveFontSizes } from '@mui/material'

const comfortaa = Comfortaa({ subsets: ['latin'] })

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: comfortaa.style.fontFamily,
    },
  }),
)

export default theme
