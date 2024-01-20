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
