import { Grid, Autocomplete, TextField, Box, Chip } from '@mui/material'
import { Sort, ImportExport, FilterList } from '@mui/icons-material'
import { SORT_OPTIONS, ORDER_OPTIONS } from '../contants'

/* **** Grid Breakdown ****
 * With MUI grids, each 'line' consists of 12 units. 12+ pushes content to next line.
 * The left side (search bar) occupies 4/12 units on regular screens, 12/12 on small.
 * There is a spacer that occupies 3/12 units on regular screens, 0/12 on small. The
 * right side has 3 dropdowns and occupies the remaining 6/12 units. Within these 6
 * units, they are further broken down. On regular screens, all 3 dropdowns occupy
 * 4 units each. On small screens, the filter dropdown occupies 12/12 units then the
 * remaining 2 dropdowns fall to the next line, each taking 6/12 units on that line.
 */

function ItemSortSearch({
  items,
  uniqueTypes,
  sorting,
  filters,
  onChangeSearch,
  onChangeSort,
  onChangeFilters,
}) {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
      >
        <Autocomplete
          freeSolo
          size="small"
          options={items.map((item) => item.name)}
          onInputChange={(_, val) => onChangeSearch(val)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => onChangeSearch(e.target.value)}
              {...params}
              label="Search Items..."
            />
          )}
        />
      </Grid>

      {/* just to add some spacing on medium sized screens  */}
      <Grid item xs={0} sm={0} md={3} />

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={5}
        spacing={2}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
      >
        <Grid container item xs={12} sm={12} md={4}>
          <Autocomplete
            size="small"
            sx={{ minWidth: '160px', width: '100%' }}
            multiple
            limitTags={1}
            value={filters}
            onChange={onChangeFilters}
            options={uniqueTypes}
            getOptionLabel={(option) => option.value}
            isOptionEqualToValue={(option, selection) => option.value === selection.value}
            renderTags={(tag, getTagProps) => tag.map((option, index) => (
              <Chip size="small" label={option.value} {...getTagProps({ index })} />
            ))}
            renderInput={(params) => (
              <TextField
                {...params}
                // slightly hacky but trying to keep the props that render multiple tags as well as
                // adding my own 'startAdornment'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <FilterList />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
                label="Filter By"
              />
            )}
          />
        </Grid>

        <Grid container item xs={6} sm={6} md={4}>
          <Autocomplete
            size="small"
            sx={{ minWidth: '160px', width: '100%' }}
            value={sorting.field.charAt(0).toUpperCase() + sorting.field.slice(1)}
            isOptionEqualToValue={(option) => option.value === sorting.field}
            options={SORT_OPTIONS}
            disableClearable
            onChange={(_, val) => onChangeSort(val, 'field')}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, startAdornment: <Sort /> }}
                label="Sort By"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.icon}
                {option.label}
              </Box>
            )}
          />
        </Grid>

        <Grid container item xs={6} sm={6} md={4}>
          <Autocomplete
            sx={{ minWidth: '160px', width: '100%' }}
            size="small"
            value={sorting.order.charAt(0).toUpperCase() + sorting.order.slice(1)}
            isOptionEqualToValue={(option) => option.value === sorting.order}
            options={ORDER_OPTIONS}
            disableClearable
            onChange={(_, val) => onChangeSort(val, 'order')}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, startAdornment: <ImportExport /> }}
                label="Order By"
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ItemSortSearch
