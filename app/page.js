'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Autocomplete, TextField, Button, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import Item from './components/item'

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
  backgroundColor: '#d9d9d9',
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR('/api/folders', fetcher)
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: 'name', order: 'asc' })
  const [sortedItems, setSortedItems] = useState([])

  useEffect(() => {
    const { field } = sorting
    let items = data?.folders ? [...data.folders] : []

    if (folderInView?.files) {
      items = [...folderInView.files]
    }

    if (items && searchString !== '') {
      items = items.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
    }

    if (items && field !== '') {
      if (field === 'name') {
        items = items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (field === 'date') {
        items = items.sort((a, b) => {
          // if there is no date (i.e. folders, give them a value of 0 to appear at top of list
          const dateA = a.added ? new Date(a.added) : new Date(0)
          const dateB = b.added ? new Date(b.added) : new Date(0)
          return dateA - dateB
        })
      }
    }

    setSortedItems([...items])
  }, [data?.folders, folderInView?.files, searchString, sorting, sorting.field])

  const handleSearchChange = (item) => {
    // item may be null if input has been cleared
    setSearchString(item ?? '')
  }

  const handleChangeSorting = (event) => {
    setSorting({ ...sorting, field: event.target.value })
  }

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setFolderInView(item)
    }
  }

  return (
    <main>
      <StyledContainerBox>
        <Grid container item alignItems="center" justifyContent="center">
          <Typography variant="h5">BrightHR Tech Test</Typography>
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
            <Grid container item alignItems="center" justifyContent="space-between">
              <Autocomplete
                sx={{ width: '300px' }}
                freeSolo
                options={sortedItems.map((item) => item.name)}
                onInputChange={(_, val) => handleSearchChange(val)}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => handleSearchChange(e.target.value)}
                    {...params}
                    label="Search Items..."
                  />
                )}
              />

              <Select value={sorting.field} onChange={handleChangeSorting}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </Grid>
            <Grid container alignItems="center" justifyContent="flex-start">
              {sortedItems.map((item) => (
                <Item
                  itemData={item}
                  key={`${item.name}_${item.added}`}
                  onItemClick={handleItemClick}
                />
              ))}
            </Grid>
          </StyledItemBox>
        )}
      </StyledContainerBox>
    </main>
  )
}
