import highLightEle from './highLightEle'
import bodyStyle from '../../components/comments/MessageCard/scss/message-body.module.scss'

export default function bindATagSmoothScroll(ev) {
  const target = ev.target
  if (target.nodeName !== 'A' || target.className !== 'bbs-at') return
  if (!target.getAttribute('href').startsWith('#')) return
  ev.preventDefault()
  const ele = document.getElementById(target.getAttribute('href').slice(1))
  if (!ele) return
  // todo Compatible?
  ele.scrollIntoView({
    behavior: 'smooth'
  })
  highLightEle(ele.getElementsByClassName(bodyStyle['bbs-msg-body'])[0])
}
