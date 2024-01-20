import {
  InsertDriveFileOutlined,
  PictureAsPdfOutlined,
  StackedBarChartOutlined,
  FolderOutlined,
  FolderZipOutlined,
  ImageOutlined,
} from '@mui/icons-material'
import { getColorFromType } from '../utils'

const ICON_SIZE = { width: '100%', height: '50px' }

const ICON_MAPPING = {
  default: <InsertDriveFileOutlined sx={{ color: getColorFromType('default'), ...ICON_SIZE }} />,
  pdf: <PictureAsPdfOutlined sx={{ color: getColorFromType('pdf'), ...ICON_SIZE }} />,
  csv: <StackedBarChartOutlined sx={{ color: getColorFromType('csv'), ...ICON_SIZE }} />,
  folder: <FolderOutlined sx={{ color: getColorFromType('folder'), ...ICON_SIZE }} />,
  zip: <FolderZipOutlined sx={{ color: getColorFromType('zip'), ...ICON_SIZE }} />,
  png: <ImageOutlined sx={{ color: getColorFromType('png'), ...ICON_SIZE }} />,
}

function ItemIcon({ type }) {
  return ICON_MAPPING[type] || ICON_MAPPING.default
}

export default ItemIcon
