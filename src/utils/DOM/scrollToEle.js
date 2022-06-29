import highLightEle from './highLightEle'

export default function scrollToEle(ele, { highlight = false, smooth = false, offset = 0 } = {}) {
  if (!ele) return Promise.resolve(false)
  if (!(ele instanceof Element)) {
    ele = ele.current
  }
  if (!(ele instanceof Element)) {
    throw new Error('Pass ele is not correct, should be a HTML Element or React HTML Ref')
  }
  let targetEle = ele
  let parentNode = getScrollParent(targetEle)
  return new Promise((res) => {
    while (parentNode) {
      scrollTo(targetEle, parentNode, {
        highlight,
        smooth,
        offset: targetEle === ele ? offset : 0
      })
      targetEle = parentNode
      parentNode = getScrollParent(parentNode)
    }
    setTimeout(() => {
      res(true)
    }, 500)
  })
}

function scrollTo(target, parent, { highlight, smooth, offset }) {
  const top = Math.max(calculateTopPosition(target, parent), 0)
  if (parent instanceof Document) {
    parent = window
  }
  if (highlight) highLightEle(target)
  try {
    parent.scrollTo({
      top: top - offset,
      behavior: smooth ? 'smooth' : 'instant'
    })
  } catch (_) {
    if (parent === window) parent = document.documentElement || document.body
    parent.scrollTop = top
  }
}

function getScrollParent(node) {
  const parentNode = node.parentNode
  if (parentNode == null) {
    return null
  }
  if (!(parentNode instanceof Element)) {
    if (parentNode instanceof Document) {
      return parentNode
    }
    return null
  }
  const overflowY = getComputedStyle(parentNode)['overflow-y']
  if (parentNode.scrollHeight > parentNode.clientHeight && ['auto', 'scroll'].includes(overflowY)) {
    return parentNode
  } else {
    return getScrollParent(parentNode)
  }
}

function calculateTopPosition(el, target = null) {
  if (el == null || target == null) return 0
  if (el === target) return 0
  if (el.offsetParent === target.offsetParent) {
    return el.offsetTop - target.offsetTop
  } else {
    return el.offsetTop + calculateTopPosition(el.offsetParent)
  }
}
