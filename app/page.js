'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Button } from '@mui/material'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowBack, FolderOutlined } from '@mui/icons-material'
import Item from './components/item'
import ItemSortSearch from './components/item_sort_search'

const StyledContainerBox = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
  gridTemplateRows: '0.4fr 0.1fr 1fr',
  height: '100vh',
  textAlign: 'center',
  gap: '10px',
})

const StyledItemBox = styled(Box)({
  padding: '15px',
  minHeight: '100%',
  minWidth: '100vw',
  backgroundColor: '#EAEAEA',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  border: '2px solid #3db0f7',
  borderBottom: 'none',
})

const StyledFolderHeader = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '100px auto 100px',
  width: '100%',
  marginBottom: '30px',
})

const StyledBackButton = styled(Button)({
  borderRadius: '20px',
  height: 'auto',
  background: '#d6d6d6',
  fontWeight: '900',
  color: '#000',
  '&:hover': {
    boxShadow: 'inset 0px 0px 0px 2px #000',
  },
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const { data, isLoading, isValidating } = useSWR('/api/folders', fetcher, { revalidateOnFocus: false })
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: 'name', order: 'ascend' })
  const [filters, setFilters] = useState([])

  // this function is doing a lot of heavy lifting to apply all types of sorting and filtering
  // available - it's been setup this way to allow for all filters/sorting to work with each other
  const filteredItems = useMemo(() => {
    const { field, order } = sorting
    let items = data?.folders ? [...data.folders] : []

    // firstly, if we are inside a folder, limit the items to only those
    if (folderInView?.files) {
      items = [...folderInView.files]
    }

    // then filter the items based on a search string if it exists
    if (searchString !== '') {
      items = items.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
    }

    // then sort alphabetically on name or type - or sort by date
    if (field === 'name' || field === 'type') {
      items = items.sort((a, b) => (order === 'ascend'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field])))
    } else if (field === 'date') {
      items = items.sort((a, b) => {
        const dateA = a.added ? new Date(a.added) : new Date(0)
        const dateB = b.added ? new Date(b.added) : new Date(0)
        return order === 'ascend' ? dateA - dateB : dateB - dateA
      })
    }

    // then, if there are file type filters, apply those
    if (filters.length > 0) {
      const typesToFilter = filters.map((filter) => filter.value)
      items = items.filter((item) => typesToFilter.includes(item.type))
    }

    return items
  }, [data?.folders, folderInView?.files, filters, searchString, sorting])

  // to keep track of all the file types we can filter off even when we've already applied filtering
  const uniqueTypes = [...new Set(data?.folders.map((item) => item.type))].map((type) => ({
    value: type,
  }))

  const handleSearchChange = (item) => {
    // item may be null if input has been cleared
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
    }
  }

  const handleChangeFilters = (_, newValue) => {
    setFilters(newValue)
  }

  return (
    <main>
      <StyledContainerBox>
        <Grid container item alignItems="center" justifyContent="center">
          <Image
            src="/logo.png"
            alt="logo"
            width="1920"
            height="739"
            style={{ width: '400px', objectFit: 'contain', height: 'auto' }}
          />
        </Grid>

        <ItemSortSearch
          items={filteredItems}
          uniqueTypes={uniqueTypes}
          sorting={sorting}
          filters={filters}
          onChangeSearch={handleSearchChange}
          onChangeSort={handleChangeSorting}
          onChangeFilters={handleChangeFilters}
        />

        {isLoading || isValidating ? (
          'Loading'
        ) : (
          <StyledItemBox>
            {folderInView && (
              <StyledFolderHeader>
                <StyledBackButton
                  size="large"
                  startIcon={<ArrowBack />}
                  onClick={() => setFolderInView(null)}
                >
                  <span style={{ marginBottom: '-4px' }}>Back</span>
                </StyledBackButton>
                <Grid
                  container
                  width="auto"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  columnSpacing={2}
                >
                  <Grid item>
                    <FolderOutlined
                      sx={{
                        color: '#fff',
                        borderRadius: '100%',
                        bgcolor: '#3db0f7',
                        height: '50px',
                        width: '50px',
                        padding: '10px',
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">{folderInView?.name}</Typography>
                  </Grid>
                </Grid>
                <div />
              </StyledFolderHeader>
            )}

            <Grid
              container
              alignItems="center"
              justifyContent="flex-start"
              sx={{
                overflow: 'scroll',
                marginTop: '10px',
                maxHeight: folderInView ? '70%' : '100%', // the folder header needs space to preserve 100vh
                paddingBottom: '10px',
              }}
              spacing={2}
            >
              {filteredItems.map((item) => (
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
