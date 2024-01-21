import { Grid, Autocomplete, TextField, Box, Chip, styled, Popper } from '@mui/material'
import { Sort, ImportExport, FilterList, Search } from '@mui/icons-material'
import { SORT_OPTIONS, ORDER_OPTIONS } from '../contants'
import { capitiseFirstLetter } from '../utils'

const StyledAutoComplete = styled(Autocomplete)({
  minWidth: '160px',
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '20px',
  border: '2px solid #3db0f7',
  fieldset: {
    border: 'none',
  },
  svg: {
    color: '#3db0f7',
  },
  '& .MuiFormLabel-root': {
    marginTop: '-10px', // fixes label clipping with above border styles
  },
  '& .MuiAutocomplete-input': {
    padding: '2.5px 4px 0px 8px !important',
  },
})

const StyledPopper = styled(Popper)({
  marginTop: '10px !important',
  borderRadius: '20px',
  boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.15)',
  '& .MuiPaper-root': {
    borderRadius: '20px',
  },
})

/* **** Grid Breakdown ****
 * With MUI grids, each 'line' consists of 12 units. 12+ pushes content to next line.
 * The left side (search bar) occupies 4/12 units on regular screens, 12/12 on small.
 * There is a spacer that occupies 3/12 units on regular screens, 0/12 on small. The
 * right side has 3 dropdowns and occupies the remaining 6/12 units. Within these 6
 * units, they are further broken down. On regular screens, all 3 dropdowns occupy
 * 4 units each. On small screens, the filter dropdown occupies 12/12 units then the
 * remaining 2 dropdowns fall to the next line, each taking 6/12 units on that line.
 */

function ItemFilters({
  items,
  fileTypes,
  sorting,
  filters,
  isTableView,
  onChangeSearch,
  onChangeSort,
  onChangeFilters,
}) {
  return (
    <Grid container alignItems="center" columnSpacing={2} rowSpacing={2} sx={{ padding: '0 15px' }}>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={4}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
      >
        <StyledAutoComplete
          freeSolo
          size="small"
          PopperComponent={StyledPopper}
          options={items.map((item) => item.name)}
          onInputChange={(_, val) => onChangeSearch(val)}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              onChange={(e) => onChangeSearch(e.target.value)}
              placeholder="Search Items..."
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: <Search />,
              }}
            />
          )}
        />
      </Grid>

      {/* just to add some spacing on medium sized screens  */}
      <Grid item xs={0} sm={0} md={2} />

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={6}
        columnSpacing={2}
        rowSpacing={{ xs: 4, sm: 4, md: 2 }}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
      >
        <Grid container item xs={12} sm={12} md={4}>
          <StyledAutoComplete
            PopperComponent={StyledPopper}
            size="small"
            multiple
            limitTags={1}
            value={filters}
            onChange={onChangeFilters}
            options={fileTypes}
            getOptionLabel={(option) => capitiseFirstLetter(option.value)}
            isOptionEqualToValue={(option, selection) => option.value === selection.value}
            renderTags={(tag, getTagProps) => tag.map((option, index) => (
              <Chip
                size="small"
                label={capitiseFirstLetter(option.value)}
                {...getTagProps({ index })}
              />
            ))}
            renderInput={(params) => (
              <TextField
                placeholder={filters.length > 0 ? '' : 'File Types...'}
                {...params}
                // trying to keep the props that render multiple tags as well as adding my own 'startAdornment'
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

        {/* no need to show sorting and ordering on table view since the table can handle it  */}
        {!isTableView && (
          <>
            <Grid container item xs={6} sm={6} md={4}>
              <StyledAutoComplete
                PopperComponent={StyledPopper}
                size="small"
                value={capitiseFirstLetter(sorting.field)}
                isOptionEqualToValue={(option) => option.value === sorting.field}
                options={SORT_OPTIONS}
                disableClearable
                onChange={(_, val) => onChangeSort(val, 'field')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // why does MUI have 'inputProps' and 'InputProps'??
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
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
              <StyledAutoComplete
                PopperComponent={StyledPopper}
                size="small"
                value={capitiseFirstLetter(sorting.order)}
                isOptionEqualToValue={(option) => option.value === sorting.order}
                options={ORDER_OPTIONS}
                disableClearable
                onChange={(_, val) => onChangeSort(val, 'order')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{ ...params.InputProps, startAdornment: <ImportExport /> }}
                    label="Order By"
                  />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default ItemFilters
