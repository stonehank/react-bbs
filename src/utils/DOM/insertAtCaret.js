export function calcValueAndPos(ele, insertStr, deletePrefixLen = 0) {
  const _startPos = ele.selectionStart
  const endPos = ele.selectionEnd
  const startPos = _startPos - deletePrefixLen
  const value = ele.value
  const scrollTop = ele.scrollTop
  const newValue =
    value.substring(0, startPos) + insertStr + value.substring(_startPos, endPos) + value.substring(endPos)
  return [newValue, scrollTop, startPos, endPos]
}

export function resolveTAB(ele, insertStr = '  ') {
  const ids = []
  let newValue = ele.value
  const selectVal = ele.value.substring(ele.selectionStart, ele.selectionEnd)
  const initS = ele.selectionStart
  const initE = ele.selectionEnd
  const insertLen = insertStr.length
  let startPos
  let endPos
  const scrollTop = ele.scrollTop
  let id = selectVal.indexOf('\n')
  while (id !== -1) {
    ids.push(id)
    id = selectVal.indexOf('\n', id + 1)
  }
  let s = initS
  for (let i = 0; i <= ids.length; i++) {
    const _s = s
    let _e = null
    if (i === ids.length) _e = initE + i * insertLen
    else _e = initS + ids[i] + i * insertLen
    s = _e + 1 + insertLen
    newValue = newValue.substring(0, _s) + insertStr + newValue.substring(_s, _e) + newValue.substring(_e)
  }
  startPos = initS + insertLen
  endPos = initE + insertLen * (ids.length + 1)
  return [newValue, scrollTop, startPos, endPos]
}

export function getEmojiPrefix(value, startPos, head = ':') {
  const beforeCaret = value.substring(0, startPos)
  const lastIdx = beforeCaret.lastIndexOf(head)
  if (lastIdx === -1) return null
  if (lastIdx === 0 || beforeCaret[lastIdx - 1] === ' ' || beforeCaret[lastIdx - 1] === '\n') {
    return beforeCaret.substring(lastIdx + head.length)
  }
  return null
}
