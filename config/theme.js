'use client'

import { Comfortaa } from 'next/font/google'
import { createTheme } from '@mui/material'

const comfortaa = Comfortaa({ subsets: ['latin'] })
const theme = createTheme({
  typography: {
    fontFamily: comfortaa.style.fontFamily,
  },
})

// ideally there should be responsive values for all variants (h1, p, body etc.)
// but h6 is all that is needed for now
theme.typography.h6 = {
  fontSize: '1rem', // default font size

  '@media (max-width:1100px)': {
    fontSize: '0.9rem',
  },
  '@media (max-width:1000px)': {
    fontSize: '0.8rem',
  },

  '@media (max-width:600px)': {
    fontSize: '0.6rem',
  },
}

export default theme
