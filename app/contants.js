import { CalendarMonth, Edit, FilePresent } from '@mui/icons-material'

export const SORT_OPTIONS = [
  { label: 'Name', value: 'name', icon: <Edit /> },
  { label: 'Date', value: 'date', icon: <CalendarMonth /> },
  { label: 'File Type', value: 'type', icon: <FilePresent /> },
]

export const ORDER_OPTIONS = [
  { label: 'Ascending', value: 'ascending' },
  { label: 'Descending', value: 'descending' },
]
