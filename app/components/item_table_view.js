import { useMemo, useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ItemIcon from './item_icon'

const TABLE_HEAD_CELLS = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'added',
    numeric: false,
    disablePadding: false,
    label: 'Date Added',
  },
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const ItemsTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: '0px 8px',
  '& th': {
    background: '#EAEAEA',
  },
  '& tbody': {
    '& td': {
      backgroundColor: 'white',
      padding: '10px',
      '&:first-child': {
        borderRadius: '20px 0 0 20px',
      },
      '&:last-child': {
        borderRadius: '0 20px 20px 0',
      },
    },
  },
})

function TableHeader({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {TABLE_HEAD_CELLS.map((headCell) => (
          <TableCell
            sx={{ background: 'none' }}
            key={headCell.id}
            align={headCell.id === 'name' ? 'left' : 'right'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontSize: '16px' }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function ItemTableView({ items, onClickFolder }) {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const rows = items.map((item) => ({ name: item.name, type: item.type, added: item.added, files: item.files }))

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rows, rowsPerPage],
  )

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TableContainer sx={{ flex: 1, overflow: 'scroll' }}>
        <ItemsTable sx={{ minWidth: 750 }} stickyHeader size="medium">
          <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                tabIndex={-1}
                key={row.id}
                sx={{ cursor: row.type === 'folder' ? 'pointer' : 'default' }}
                onClick={() => onClickFolder(row)}
              >
                {TABLE_HEAD_CELLS.map((headCell) => (
                  <TableCell key={headCell.id} align={headCell.id === 'name' ? 'left' : 'right'}>
                    {headCell.id === 'name' ? (
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '40px auto',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <ItemIcon type={row.type} />
                        {row[headCell.id]}
                      </Box>
                    ) : (
                      row[headCell.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </ItemsTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ flexShrink: 0, '.MuiToolbar-gutters': { padding: 0 } }}
      />
    </Box>
  )
}
