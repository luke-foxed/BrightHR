/* eslint-disable react/jsx-props-no-spreading */
import {
  InsertDriveFileOutlined,
  PictureAsPdfOutlined,
  StackedBarChartOutlined,
  FolderOutlined,
  FolderZipOutlined,
  ImageOutlined,
} from '@mui/icons-material'

const ICON_SIZE = { width: '50px', height: '50px' }

const ICON_MAPPING = {
  default: <InsertDriveFileOutlined sx={{ color: '#D839CB', ...ICON_SIZE }} />,
  pdf: <PictureAsPdfOutlined sx={{ color: '#D83939', ...ICON_SIZE }} />,
  csv: <StackedBarChartOutlined sx={{ color: '#39D87E', ...ICON_SIZE }} />,
  folder: <FolderOutlined sx={{ color: '#3949D8', ...ICON_SIZE }} />,
  zip: <FolderZipOutlined sx={{ color: '#7E39D8', ...ICON_SIZE }} />,
  png: <ImageOutlined sx={{ color: '#D8A639', ...ICON_SIZE }} />,
}

function ItemIcon({ type }) {
  return ICON_MAPPING[type] || ICON_MAPPING.default
}

export default ItemIcon
