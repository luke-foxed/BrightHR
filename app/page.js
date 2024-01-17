'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Autocomplete, TextField, Button, ButtonBase } from '@mui/material'
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
  padding: '40px',
  minHeight: '100%',
  backgroundColor: '#ccc',
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
})

const StyledItemButton = styled(Button)({
  borderRadius: '10px',
  padding: '10px',
  height: '140px',
  width: '200px',
  color: '#000',
  backgroundColor: '#fff',
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR('/api/folders', fetcher)
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: '', order: 'asc' })
  const [sortedItems, setSortedItems] = useState([])

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setFolderInView(item)
    }
  }

  let items = data?.folders

  if (folderInView?.files) {
    items = folderInView.files
  }

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
            {folderInView && (
              <Grid container item alignItems="center" justifyContent="space-between">
                <Button onClick={() => setFolderInView(null)}>Back</Button>
                <Typography>{folderInView?.name}</Typography>
                {/* div used purely to align the above two elements  */}
                <div />
              </Grid>
            )}
            {/* <Autocomplete
              sx={{ width: '300px' }}
              options={data.folders.map((item) => item.name)}
              disablePortal
              renderInput={(params) => <TextField {...params} label="Search Items..." />}
            /> */}
            <Grid container alignItems="center" justifyContent="flex-start">
              {items.map((item) => (
                <Grid key={`${item.name}_${item.added}`} xs={3} md={2} sx={{ padding: '10px' }}>
                  <StyledItemButton onClick={() => handleItemClick(item)}>
                    <Grid
                      container
                      direction="column"
                      item
                      alignItems="center"
                      justifyContent="center"
                    >
                      <ItemIcon type={item.type} />
                      <Typography>{item.name}</Typography>
                    </Grid>
                  </StyledItemButton>
                </Grid>
              ))}
            </Grid>
          </StyledItemBox>
        )}
      </StyledContainerBox>
    </main>
  )
}
