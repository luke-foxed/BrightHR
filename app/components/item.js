import { Typography, Grid, styled, Button, Tooltip, Box } from '@mui/material'
import { CalendarMonth } from '@mui/icons-material'
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

const StyledItem = styled(Box, { shouldForwardProp: (prop) => prop !== 'type' })(({ type }) => ({
  display: 'grid',
  gridTemplateRows: type === 'folder' ? 'auto auto' : '50% 30% 20%',
  gridTemplateColumns: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  borderRadius: '20px',
  width: '100%',
}))

const ItemDateSection = styled(Box)({
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
  if (title.length <= maxLength) {
    return <Typography>{type === 'folder' ? title : `${title}.${type}`}</Typography>
  }

  const ellipsis = '...'
  const halfMaxLength = Math.floor((maxLength - ellipsis.length) / 2)
  const truncatedTitle = title.substring(0, halfMaxLength) + ellipsis + title.substring(title.length - halfMaxLength)

  return (
    <Tooltip arrow placement="bottom" title={title}>
      {type === 'folder' ? title : `${truncatedTitle}.${type}`}
    </Tooltip>
  )
}

function Item({ itemData, onItemClick }) {
  const { type, name, added } = itemData
  return (
    <Grid item xs={4} sm={3} md={2} sx={{ height: '160px' }}>
      <StyledItemButton onClick={() => onItemClick(itemData)}>
        <StyledItem type={type}>
          <ItemIcon type={type} />
          <Typography>
            <TruncatedTitle type={type} title={name} maxLength={16} />
          </Typography>
          {type !== 'folder' && (
            <ItemDateSection>
              <CalendarMonth fontSize="small" />
              <Typography sx={{ marginBottom: '-4px' }} variant="p">
                {added}
              </Typography>
            </ItemDateSection>
          )}
        </StyledItem>
      </StyledItemButton>
    </Grid>
  )
}

export default Item
