import { Typography, Grid, styled, Button, Tooltip, Box, useMediaQuery, useTheme } from '@mui/material'
import { CalendarMonth, DynamicFeedOutlined } from '@mui/icons-material'
import ItemIcon from './item_icon'

const StyledItemButton = styled(Button)({
  borderRadius: '20px',
  width: '100%',
  height: '100%',
  color: '#000',
  backgroundColor: '#fff',
  padding: '0px',
  '&:hover': {
    background: '#f5f5f5 !important',
  },
})

const StyledItem = styled(Box)({
  display: 'grid',
  gridTemplateRows: '50% 30% 20%',
  gridTemplateColumns: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  borderRadius: '20px',
  width: '100%',
})

const ItemFooter = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: '0 0 20px 20px', // Rounded corners for bottom left and right
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
})

function TruncatedTitle({ type, title, maxLength }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  // truncate more of the string if we are working with a small screen
  const adjustedMaxLength = isSmallScreen ? maxLength - 4 : maxLength

  if (title.length <= adjustedMaxLength) {
    return (
      <Typography sx={{ overflowWrap: 'break-word' }} variant="h6">
        {type === 'folder' ? title : `${title}.${type}`}
      </Typography>
    )
  }

  const ellipsis = '...'
  const halfMaxLength = Math.floor((adjustedMaxLength - ellipsis.length) / 2)
  const truncatedTitle = title.substring(0, halfMaxLength) + ellipsis + title.substring(title.length - halfMaxLength)

  return (
    <Tooltip arrow placement="bottom" title={title}>
      <Typography sx={{ overflowWrap: 'break-word' }} variant="h6">
        {type === 'folder' ? title : `${truncatedTitle}.${type}`}
      </Typography>
    </Tooltip>
  )
}

function Item({ itemData, onItemClick }) {
  const { type, name, added, files } = itemData
  return (
    <Grid item xs={4} sm={3} md={2} sx={{ height: '180px' }}>
      <StyledItemButton onClick={() => onItemClick(itemData)}>
        <StyledItem>
          <ItemIcon type={type} />
          <TruncatedTitle type={type} title={name} maxLength={20} />
          <ItemFooter>
            {type === 'folder' ? <DynamicFeedOutlined size="small" /> : <CalendarMonth fontSize="small" />}
            <Typography sx={{ marginBottom: '-4px' }} variant="p">
              {type === 'folder' ? `${files.length} Items` : added}
            </Typography>
          </ItemFooter>
        </StyledItem>
      </StyledItemButton>
    </Grid>
  )
}

export default Item
