'use client'

import useSWR from 'swr'
import { Typography, Grid } from '@mui/material'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR('/api/folders', fetcher)

  return (
    <main>
      <Grid container alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
        <Typography variant="h5">Bright HR Tech Test</Typography>
      </Grid>
    </main>
  )
}
