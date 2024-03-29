export function getLinkWithoutProtocol(link) {
  if (!link) return ''
  const protocolMatch = link.match(/http(?:s)?:\/\//)
  let linkWithoutPro = link
  if (protocolMatch) {
    linkWithoutPro = linkWithoutPro.slice(protocolMatch[0].length)
  }
  return linkWithoutPro
}
