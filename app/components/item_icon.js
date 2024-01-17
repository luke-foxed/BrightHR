/* eslint-disable react/jsx-props-no-spreading */
import { InsertDriveFile, PictureAsPdf, StackedBarChart, Folder, FolderZip, Image } from '@mui/icons-material'

const ICON_SIZE = { style: { width: '50px', height: '50px' } }

const ICON_MAPPING = {
  default: <InsertDriveFile {...ICON_SIZE} />,
  pdf: <PictureAsPdf {...ICON_SIZE} />,
  csv: <StackedBarChart {...ICON_SIZE} />,
  folder: <Folder {...ICON_SIZE} />,
  zip: <FolderZip {...ICON_SIZE} />,
  png: <Image {...ICON_SIZE} />,
}

function ItemIcon({ type }) {
  return ICON_MAPPING[type] || ICON_MAPPING.default
}

export default ItemIcon
