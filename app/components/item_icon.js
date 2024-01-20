/* eslint-disable react/jsx-props-no-spreading */
import {
  InsertDriveFileOutlined,
  PictureAsPdfOutlined,
  StackedBarChartOutlined,
  FolderOutlined,
  FolderZipOutlined,
  ImageOutlined,
} from '@mui/icons-material'

const ICON_SIZE = { width: '100%', height: '50px' }

const ICON_MAPPING = {
  default: <InsertDriveFileOutlined sx={{ color: '#f73db0', ...ICON_SIZE }} />,
  pdf: <PictureAsPdfOutlined sx={{ color: '#f73d60', ...ICON_SIZE }} />,
  csv: <StackedBarChartOutlined sx={{ color: '#3df748', ...ICON_SIZE }} />,
  folder: <FolderOutlined sx={{ color: '#6e3df7', ...ICON_SIZE }} />,
  zip: <FolderZipOutlined sx={{ color: '#a53df7', ...ICON_SIZE }} />,
  png: <ImageOutlined sx={{ color: '#f7d13d', ...ICON_SIZE }} />,
}

function ItemIcon({ type }) {
  return ICON_MAPPING[type] || ICON_MAPPING.default
}

export default ItemIcon
