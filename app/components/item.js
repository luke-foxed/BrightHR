import { Typography, Grid, styled, Button } from '@mui/material'
import ItemIcon from './item_icon'

const StyledItemButton = styled(Button)({
  borderRadius: '10px',
  padding: '10px',
  height: '160px',
  width: '100%',
  color: '#000',
  backgroundColor: '#fff',
})

function Item({ itemData, onItemClick }) {
  const { type, name, added } = itemData
  return (
    <Grid xs={4} sm={3} md={2} sx={{ padding: '10px' }}>
      <StyledItemButton onClick={() => onItemClick(itemData)}>
        <Grid container direction="column" item alignItems="center" justifyContent="center">
          <ItemIcon type={type} />
          <Typography>{name}</Typography>
          <Typography>{added}</Typography>
        </Grid>
      </StyledItemButton>
    </Grid>
  )
}

export default Item
