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
import { TABLE_HEAD_CELLS } from '../contants'
import { getComparator, sortItems } from '../utils'

const ItemsTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: '0px 8px',
  '& th': {
    background: '#EAEAEA',
  },
  '& tbody': {
    '& td': {
      backgroundColor: 'white',
      padding: '8px',
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
              direction={orderBy === headCell.id ? order : 'ascend'}
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

export default function ItemTableView({ items, folderInView, onClickFolder }) {
  const [order, setOrder] = useState('ascend')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const rows = items.map((item) => ({ name: item.name, type: item.type, added: item.added, files: item.files }))

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'ascend'
    setOrder(isAsc ? 'descend' : 'ascend')
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
    () => sortItems(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rows, rowsPerPage],
  )

  return (

    <Box sx={{ width: '100%', height: folderInView ? '85%' : '100%', display: 'flex', flexDirection: 'column' }}>
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
