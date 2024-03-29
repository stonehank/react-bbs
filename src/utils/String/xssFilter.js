/**
 * XSS filter
 * @param {String} content Html String
 */
const xssFilter = (content) => {
  let node = document.createElement('div')
  node.insertAdjacentHTML('afterbegin', content)
  const subNodes = node.querySelectorAll('*')

  const rejectNodes = [
    'INPUT',
    'STYLE',
    'SCRIPT',
    'IFRAME',
    'FRAME',
    'AUDIO',
    'VIDEO',
    'EMBED',
    'META',
    'TITLE',
    'LINK',
    'FORM',
    'TEMPLATE'
  ]
  const __replaceVal = (node, curAttr) => {
    const val = attribute(node, curAttr)
    if (val) attribute(node, curAttr, val.replace(/(javascript|eval)/gi, ''))
  }
  subNodes.forEach((n) => {
    if (typeof n.nodeType === 'number' && n.nodeType !== 1) return
    let nodeName = n.nodeName
    if (typeof nodeName !== 'string') {
      const match = Object.prototype.toString.call(n).match(/^\[object HTML(.*)Element]$/)
      if (!match) return
      nodeName = match[1].toUpperCase()
    }
    if (rejectNodes.includes(nodeName)) {
      if (nodeName === 'INPUT' && attribute(n, 'type') === 'checkbox') {
        attribute(n, { disabled: 'disabled' })
      } else {
        let parentNode = n.parentNode
        if (parentNode.getAttribute('name') === 'parentNode') {
          parentNode = n.parentElement
        }
        if (typeof parentNode.removeChild !== 'function') {
          if (parentNode.nodeName === 'FORM') return
        }
        parentNode.removeChild(n)
        return
      }
    }
    if (nodeName === 'A') {
      __replaceVal(n, 'href')
    }
    if (nodeName === 'IMG') {
      __replaceVal(n, 'src')
    }
    clearAttr(n)
  })
  const res = node.innerHTML
  node = null
  return res
}
function attribute(ele, name, value) {
  if (ele.getAttribute == null) {
    return
  }
  if (value !== undefined) {
    if (value === null) ele.removeAttribute(name)
    else {
      ele.setAttribute(name, value)
    }
  } else {
    if (Object.prototype.toString.call(name) === '[object Object]') {
      for (const k in name) {
        ele.setAttribute(k, name[k])
      }
    } else {
      return ele.getAttribute(name)
    }
  }
}

let keepClassPre = null
function clearAttr(el) {
  const attrs = el.attributes
  const ignoreAttrs = [
    'align',
    'alt',
    'checked',
    'disabled',
    'href',
    'id',
    'target',
    'title',
    'type',
    'src',
    'class' /* 'style' */
  ]
  const removeAttrs = []
  const addToStyles = []
  for (const attr of attrs) {
    const name = attr.name
    switch (attr.name.toLowerCase()) {
      case 'style':
        // attr.value.split(';').forEach((item) => {
        //   if (item.split(':')[0]==='color') {
        //     addToStyles.push(item)
        //   }
        // })
        break
      case 'class':
        if (el.className === 'at') {
          continue
        } else if (
          (el.nodeName === 'PRE' || el.nodeName === 'CODE') &&
          (el.className.startsWith('language-') || el.className.startsWith('hljs'))
        ) {
          keepClassPre = el
        } else {
          if (!isDescendant(keepClassPre, el)) {
            removeAttrs.push('class')
          }
        }
        break
      default:
        break
    }
    if (!ignoreAttrs.includes(name)) {
      removeAttrs.push(name)
    }
  }
  for (const name of removeAttrs) {
    el.removeAttribute(name)
  }
  for (const item of addToStyles) {
    attribute(el, 'style', item)
  }
  return el
}

function isDescendant(parent, child) {
  if (!parent) return null
  if (parent === child) return true
  let node = child.parentNode
  while (node != null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}
export default xssFilter
