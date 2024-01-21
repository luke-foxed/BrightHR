export function getColorFromType(type) {
  switch (type) {
    case 'pdf': return '#f73d60'
    case 'csv': return '#3df748'
    case 'folder': return '#6e3df7'
    case 'zip': return '#a53df7'
    case 'png': return '#f7d13d'
    default: return '#f73db0'
  }
}

export function capitiseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// below code taken from MUI: https://mui.com/material-ui/react-table/#sorting-amp-selecting
export function descendingComparator(a, b, orderBy) {
  // if sorting folders by dates, the values will be undefined so we need to move folders to top/bottom
  if (b[orderBy] === undefined) {
    return 1
  }
  if (a[orderBy] === undefined) {
    return -1
  }
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function searchItems(items, searchString) {
  return items.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
}

export function filterItems(items, filters) {
  const typesToFilter = filters.map((filter) => filter.value)
  return items.filter((item) => typesToFilter.includes(item.type))
}

export function getComparator(order, orderBy) {
  return order === 'descend'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function sortItems(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
