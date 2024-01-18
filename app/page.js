'use client'

import useSWR from 'swr'
import { Typography, Grid, styled, Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Item from './components/item'
import ItemSortSearch from './components/item_sort_search'

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
  padding: '30px',
  minHeight: '100%',
  backgroundColor: '#d9d9d9',
  borderTopLeftRadius: '40px',
  borderTopRightRadius: '40px',
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const { data, isLoading, isValidating } = useSWR('/api/folders', fetcher, { revalidateOnFocus: false })
  const [folderInView, setFolderInView] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [sorting, setSorting] = useState({ field: 'name', order: 'ascend' })
  const [filters, setFilters] = useState([])
  const [treatedItems, setTreatedItems] = useState([])

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
      if (field === 'name' || field === 'type') {
        items = items.sort((a, b) => (order === 'ascend'
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field])))
      } else if (field === 'date') {
        items = items.sort((a, b) => {
          // if we have no date (folders), put them at the start or end of the list
          const dateA = a.added ? new Date(a.added) : new Date(0)
          const dateB = b.added ? new Date(b.added) : new Date(0)
          return order === 'ascend' ? dateA - dateB : dateB - dateA
        })
      }
    }

    if (filters.length > 0) {
      const typesToFilter = filters.map((filter) => filter.value)
      items = items.filter((item) => typesToFilter.includes(item.type))
    }

    setTreatedItems([...items])
  }, [data?.folders, folderInView?.files, filters, searchString, sorting, sorting.field])

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
          <Typography variant="h5">BrightHR Tech Test</Typography>
        </Grid>

        {isLoading || isValidating ? (
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

            <ItemSortSearch
              items={treatedItems}
              sorting={sorting}
              filters={filters}
              onChangeSearch={handleSearchChange}
              onChangeSort={handleChangeSorting}
              onChangeFilters={handleChangeFilters}
            />

            <Grid container alignItems="center" justifyContent="flex-start">
              {treatedItems.map((item) => (
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
