import { Typography, Grid, styled, Button, Tooltip } from '@mui/material'
import ItemIcon from './item_icon'

const StyledItemButton = styled(Button)({
  borderRadius: '20px',
  padding: '10px',
  height: '160px',
  width: '100%',
  color: '#000',
  backgroundColor: '#fff',
})

function TruncatedTitle({ type, title, maxLength }) {
  if (title.length <= maxLength) {
    return <b>{type === 'folder' ? title : `${title}.${type}`}</b>
  }

  const ellipsis = '...'
  const halfMaxLength = Math.floor((maxLength - ellipsis.length) / 2)
  const truncatedTitle = title.substring(0, halfMaxLength) + ellipsis + title.substring(title.length - halfMaxLength)

  return (
    <Tooltip arrow placement="bottom" title={title}>
      <b>{type === 'folder' ? title : `${truncatedTitle}.${type}`}</b>
    </Tooltip>
  )
}

function Item({ itemData, onItemClick }) {
  const { type, name, added } = itemData
  return (
    <Grid item xs={4} sm={3} md={2} sx={{ padding: '10px' }}>
      <StyledItemButton onClick={() => onItemClick(itemData)}>
        <Grid container direction="column" item alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <ItemIcon type={type} />
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <TruncatedTitle type={type} title={name} maxLength={16} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{added}</Typography>
          </Grid>
        </Grid>
      </StyledItemButton>
    </Grid>
  )
}

export default Item
