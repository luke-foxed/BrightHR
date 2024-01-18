'use client'

import useSWR from 'swr'
import {
  Typography,
  Grid,
  styled,
  Box,
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
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
  const { data, isLoading } = useSWR('/api/folders', fetcher)
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: 'name', order: 'asc' })
  const [sortedItems, setSortedItems] = useState([])

  useEffect(() => {
    const { field, order } = sorting
    let items = data?.folders ? [...data.folders] : []

    if (folderInView?.files) {
      items = [...folderInView.files]
    }

    if (items && searchString !== '') {
      items = items.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
    }

    if (items && field !== '') {
      if (field === 'name') {
        items = items.sort((a, b) => (order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
      } else if (field === 'date') {
        items = items.sort((a, b) => {
          // if we have no date (folders), put them at the start or end of the list
          const dateA = a.added ? new Date(a.added) : new Date(0)
          const dateB = b.added ? new Date(b.added) : new Date(0)
          return order === 'asc' ? dateA - dateB : dateB - dateA
        })
      }
    }

    setSortedItems([...items])
  }, [data?.folders, folderInView?.files, searchString, sorting, sorting.field])

  const handleSearchChange = (item) => {
    // item may be null if input has been cleared
    setSearchString(item ?? '')
  }

  const handleChangeSorting = (event, key) => {
    if (key === 'field') {
      setSorting({ ...sorting, field: event.target.value })
    }
    if (key === 'order') {
      setSorting({ ...sorting, order: event.target.value })
    }
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
            <Grid container alignItems="center" spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
              >
                <Autocomplete
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
              </Grid>

              <Grid
                container
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
              >
                <Select
                  sx={{ minWidth: '150px' }}
                  value={sorting.field}
                  onChange={(e) => handleChangeSorting(e, 'field')}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                </Select>
                <Select
                  sx={{ minWidth: '150px' }}
                  value={sorting.order}
                  onChange={(e) => handleChangeSorting(e, 'order')}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </Grid>
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
