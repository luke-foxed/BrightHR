'use client'

import useSWR from 'swr'
import { Typography, Grid } from '@mui/material'
import ItemIcon from './components/item_icon'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR('/api/folders', fetcher)

  return (
    <main>
      <Grid container alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
        <Typography variant="h5">Bright HR Tech Test</Typography>
        {isLoading ? (
          'Loading'
        ) : (
          <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
            {data.folders.map((folder) => (
              <Grid
                key={`${folder.name}_${folder.added}`}
                xs={4}
                md={2}
                sx={{ padding: '10px' }}
              >
                <Grid
                  container
                  direction="column"
                  item
                  style={{ padding: '10px', background: '#fff' }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <ItemIcon type={folder.type} />
                  <Typography>{folder.name}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </main>
  )
}
