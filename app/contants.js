import { CalendarMonth, Edit, FilePresent } from '@mui/icons-material'

const styles = { color: '#3db0f7', marginRight: '10px' }

export const SORT_OPTIONS = [
  { label: 'Name', value: 'name', icon: <Edit sx={styles} /> },
  { label: 'Date', value: 'added', icon: <CalendarMonth sx={styles} /> },
  { label: 'File Type', value: 'type', icon: <FilePresent sx={styles} /> },
]

export const ORDER_OPTIONS = [
  { label: 'Ascend', value: 'ascend' },
  { label: 'Descend', value: 'descend' },
]

export const TABLE_HEAD_CELLS = [
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
