'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import ItemIcon from './components/item_icon'

const StyledContainerBox = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
  gridTemplateRows: '0.4fr 1fr',
  height: '100vh',
  gap: '10%',
  textAlign: 'center',
})

const StyledItemBox = styled(Box)({
  width: '100vw',
  padding: '50px',
  minHeight: '100%',
  backgroundColor: 'blue',
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
})

const StyledItem = styled(Grid)({
  borderRadius: '10px',
  padding: '10px',
  height: '140px',
  backgroundColor: '#fff',
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR('/api/folders', fetcher)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: '', order: 'asc' })
  const [sortedItems, setSortedItems] = useState([])

  return (
    <main>
      <StyledContainerBox>
        <Grid container item alignItems="center" justifyContent="center">
          <Typography variant="h5">Bright HR Tech Test</Typography>
        </Grid>

        {isLoading ? (
          'Loading'
        ) : (
          <StyledItemBox>
            <Autocomplete
              sx={{ width: '300px' }}
              ptions={data.folders.map((item) => item.name)}
              disablePortal
              renderInput={(params) => <TextField {...params} label="Search Items..." />}
            />
            <Grid container alignItems="center" justifyContent="flex-start">
              {data.folders.map((item) => (
                <Grid key={`${item.name}_${item.added}`} xs={3} md={2} sx={{ padding: '10px' }}>
                  <StyledItem
                    container
                    direction="column"
                    item
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ItemIcon type={item.type} />
                    <Typography>{item.name}</Typography>
                  </StyledItem>
                </Grid>
              ))}
            </Grid>
          </StyledItemBox>
        )}
      </StyledContainerBox>
    </main>
  )
}
