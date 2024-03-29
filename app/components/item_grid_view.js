import { Typography, Grid, styled, Button, Tooltip, Box, useMediaQuery, useTheme, lighten } from '@mui/material'
import { CalendarMonth, DynamicFeedOutlined } from '@mui/icons-material'
import ItemIcon from './item_icon'
import { getColorFromType } from '../utils'

const ItemButton = styled(Button, { shouldForwardProp: (props) => props !== 'type' })(
  ({ type }) => {
    const color = getColorFromType(type)
    return {
      borderRadius: '20px',
      width: '100%',
      transition: 'none',
      height: '100%',
      color: '#000',
      backgroundColor: '#fff',
      padding: '0px',
      '&:hover': {
        boxShadow: type === 'folder' ? `inset 0px 0px 0px 2px ${color}` : 'none',
        background: lighten(color, 0.9),
        cursor: type === 'folder' ? 'pointer' : 'default',
        '.item-footer': {
          background: 'transparent',
        },
      },
    }
  },
)

const ItemContainer = styled(Box)({
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
  transition: 'none',
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

const ItemGrid = styled(Grid)({
  overflow: 'scroll',
  marginTop: '10px',
  paddingBottom: '10px',
})

function TruncatedTitle({ type, title, maxLength }) {
  const theme = useTheme()
  // tooltips work on mobile but you need to long-press the title to see it
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
    <Tooltip arrow placement="bottom" title={`${title}.${type}`}>
      <Typography sx={{ overflowWrap: 'break-word' }} variant="h6">
        {type === 'folder' ? title : `${truncatedTitle}.${type}`}
      </Typography>
    </Tooltip>
  )
}

function Item({ itemData, onClickFolder }) {
  const { type, name, added, files } = itemData
  return (
    <Grid item xs={4} sm={3} md={2} sx={{ height: '180px' }}>
      <ItemButton onClick={() => onClickFolder(itemData)} type={type}>
        <ItemContainer>
          <ItemIcon type={type} />
          <TruncatedTitle type={type} title={name} maxLength={20} />
          <ItemFooter className="item-footer">
            {type === 'folder' ? (
              <DynamicFeedOutlined size="small" />
            ) : (
              <CalendarMonth fontSize="small" />
            )}
            <Typography sx={{ marginBottom: '-4px' }} variant="h6">
              {type === 'folder' ? `${files.length} Items` : added}
            </Typography>
          </ItemFooter>
        </ItemContainer>
      </ItemButton>
    </Grid>
  )
}

export default function ItemGridView({ items, folderInView, onClickFolder }) {
  return (
    <ItemGrid
      container
      alignItems="center"
      justifyContent="flex-start"
      sx={{ maxHeight: folderInView ? '85%' : '100%' }} // the folder header needs space to preserve 100vh
      spacing={2}
    >
      {items.map((item) => (
        <Item
          itemData={item}
          key={`${item.name}_${item.added}`}
          onClickFolder={() => onClickFolder(item)}
        />
      ))}
    </ItemGrid>
  )
}
