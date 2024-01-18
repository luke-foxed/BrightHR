import { Grid, Autocomplete, TextField, Box } from '@mui/material'
import { Sort, ImportExport } from '@mui/icons-material'
import { SORT_OPTIONS, ORDER_OPTIONS } from '../contants'

function ItemSortSearch({ items, sorting, onChangeSearch, onChangeSort }) {
  return (
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

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={6}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
      >
        <Autocomplete
          sx={{ minWidth: '180px' }}
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

        <Autocomplete
          sx={{ minWidth: '180px' }}
          value={sorting.order.charAt(0).toUpperCase() + sorting.order.slice(1)}
          isOptionEqualToValue={(option) => option.value === sorting.order}
          options={ORDER_OPTIONS}
          disableClearable
          onChange={(_, val) => onChangeSort(val, 'order')}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, startAdornment: <ImportExport /> }}
              label="OrderBy By"
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSortSearch
