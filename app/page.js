'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Button, CircularProgress, IconButton } from '@mui/material'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowBack, GridViewOutlined, TableRowsOutlined } from '@mui/icons-material'
import ItemFilters from './components/item_filters'
import ItemTableView from './components/item_table_view'
import ItemGridView from './components/item_grid_view'
import { getComparator, searchItems, sortItems } from './utils'

const RootContainer = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
  gridTemplateRows: '0.4fr 0.1fr 0.05fr 1fr',
  height: '100vh',
  textAlign: 'center',
  gap: '10px',
})

const ItemsContainer = styled(Box)({
  padding: '15px',
  minHeight: '100%',
  minWidth: '100vw',
  backgroundColor: '#EAEAEA',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  border: '2px solid #3db0f7',
  borderBottom: 'none',
})

const FolderHeader = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '100px auto 100px',
  width: '100%',
})

const FolderBackButton = styled(Button)({
  borderRadius: '20px',
  height: 'auto',
  background: '#d6d6d6',
  fontWeight: '900',
  color: '#000',
  '&:hover': {
    boxShadow: 'inset 0px 0px 0px 2px #000',
  },
})

const Divider = styled(Box)({
  height: '2px',
  width: '85%',
  background: '#3db0f7',
  margin: '2px auto',
})

/* A few places in the app will have styling to change the padding/margin bottom
 * of certain text/input items. This is because the 'Comfortaa' font being used
 * from Google seems to have extra padding on the bottom that looks a bit jarring
 * in certain MUI components.
*/

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const { data, isLoading } = useSWR('/api/folders', fetcher, { revalidateOnFocus: false })
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: 'name', order: 'ascend' })
  const [filters, setFilters] = useState([])
  const [isTableView, setIsTableView] = useState(false)

  // this function is doing a lot of heavy lifting to apply all types of sorting and filtering
  // available - it's been setup this way to allow for all filters/sorting to work with each
  // other... ideally, this filtering/sorting would be done on the API level
  const filteredItems = useMemo(() => {
    const { field, order } = sorting
    let items = data?.folders ? [...data.folders] : []

    // firstly, if we are inside a folder, limit the items to only those
    if (folderInView?.files) {
      items = [...folderInView.files]
    }

    // then filter the items based on a search string if it exists
    if (searchString !== '') {
      items = searchItems(items, searchString)
    }

    if (filters.length > 0) {
      items = filteredItems(items, filters)
    }

    items = sortItems(items, getComparator(order, field))

    return items
  }, [data?.folders, folderInView?.files, filters, searchString, sorting])

  // to keep track of all the file types we can filter off even when we've already applied filtering
  const uniqueTypes = useMemo(() => [...new Set(data?.folders.map((item) => item.type))].map((type) => ({
    value: type,
  })), [data?.folders])

  const handleSearchChange = (item) => {
    // item may be null if input has been cleared, set back to a string if so
    setSearchString(item ?? '')
  }

  const handleChangeSorting = (option, key) => {
    if (key === 'field') {
      setSorting({ ...sorting, field: option.value })
    }
    if (key === 'order') {
      setSorting({ ...sorting, order: option.value })
    }
  }

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setFolderInView(item)
      // clear all filters when entering the folder view
      setFilters([])
    }
  }

  const handleChangeFilters = (_, newValue) => {
    setFilters(newValue)
  }

  return (
    <main>
      <RootContainer>
        <Grid container item alignItems="center" justifyContent="center">
          <Image
            src="/logo.png"
            alt="logo"
            width="1920"
            height="739"
            style={{ width: '400px', objectFit: 'contain', height: 'auto' }}
          />
        </Grid>

        {isLoading ? (
          <div>
            <CircularProgress sx={{ color: '#3db0f7' }} />
            <Typography>Loading your files...</Typography>
          </div>
        ) : (
          <>
            <ItemFilters
              items={filteredItems}
              fileTypes={uniqueTypes}
              sorting={sorting}
              filters={filters}
              isTableView={isTableView}
              onChangeSearch={handleSearchChange}
              onChangeSort={handleChangeSorting}
              onChangeFilters={handleChangeFilters}
            />

            <Grid container item xs={12} justifyContent="flex-end" sx={{ padding: '0 15px' }}>
              <IconButton
                sx={{ color: isTableView ? '#3db0f7' : '#ccc' }}
                onClick={() => setIsTableView(true)}
              >
                <TableRowsOutlined />
              </IconButton>
              <IconButton
                sx={{ color: !isTableView ? '#3db0f7' : '#ccc' }}
                onClick={() => setIsTableView(false)}
              >
                <GridViewOutlined />
              </IconButton>
            </Grid>

            <ItemsContainer>
              {folderInView && (
                <FolderHeader>
                  <FolderBackButton
                    size="large"
                    startIcon={<ArrowBack />}
                    onClick={() => setFolderInView(null)}
                  >
                    <span style={{ marginBottom: '-4px' }}>Back</span>
                  </FolderBackButton>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography variant="h5">{folderInView?.name}</Typography>
                      <Divider />
                    </Grid>
                  </Grid>
                  <div />
                </FolderHeader>
              )}

              {isTableView ? (
                <ItemTableView
                  items={filteredItems}
                  folderInView={folderInView}
                  onClickFolder={handleItemClick}
                />
              ) : (
                <ItemGridView
                  items={filteredItems}
                  folderInView={folderInView}
                  onClickFolder={handleItemClick}
                />
              )}
            </ItemsContainer>
          </>
        )}
      </RootContainer>
    </main>
  )
}
