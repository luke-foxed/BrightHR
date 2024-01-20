import { CalendarMonth, Edit, FilePresent } from '@mui/icons-material'

const styles = { color: '#3db0f7', marginRight: '10px' }

export const SORT_OPTIONS = [
  { label: 'Name', value: 'name', icon: <Edit sx={styles} /> },
  { label: 'Date', value: 'date', icon: <CalendarMonth sx={styles} /> },
  { label: 'File Type', value: 'type', icon: <FilePresent sx={styles} /> },
]

export const ORDER_OPTIONS = [
  { label: 'Ascend', value: 'ascend' },
  { label: 'Descend', value: 'descend' },
]
