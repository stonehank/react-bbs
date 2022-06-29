import React, { useRef, useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useDidUpdate from '../../hooks/useDidUpdate'

const StyledAnimatedPopup = styled(animated.div)`
  position: fixed;
  /*border:1px solid var(--bbs-separator-color);*/
  background: var(--bbs-separator-background);
  border-radius: 6px;
  min-width: 64px;
  min-height: 64px;
  padding: 4px 0;
  z-index: 99;
`

type Props = {
  style: any
  popupContent: () => any
  show: boolean
  setShow: React.Dispatch<any>
  beforeOpen: () => void
  [x: string]: any
}

function PopupButton(props: Props) {
  const { show, setShow, beforeOpen, popupContent, children, ...otherProps } = props

  const [newShow, setNewShow] = useState(!!show)
  const popupBoxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [boxTop, setBoxTop] = useState(0)
  const [boxLeft, setBoxLeft] = useState(0)
  const [origin, setOrigin] = useState('top left')
  const [styles, api] = useSpring(() => ({
    from: { scale: 0, opacity: 0, dspl: 0 }
  }))
  // compatible control inside and outside
  let finalShow = show
  let finalSetShow = setShow
  if (typeof setShow !== 'function') {
    finalSetShow = setNewShow
    finalShow = newShow
  }

  useEffect(() => {
    window.addEventListener('click', hide)
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('click', hide)
      window.removeEventListener('resize', hide)
    }
  }, [])
  useDidUpdate(() => {
    api.start({
      scale: finalShow ? 1 : 0,
      opacity: finalShow ? 1 : 0,
      dspl: finalShow ? 1 : 0
    })
  }, [finalShow])

  const stopPropagation = useCallback(function(event: React.MouseEvent) {
    event.stopPropagation()
  }, [])

  function hide() {
    finalSetShow(false)
  }

  const calcPopupPos = useCallback(function() {
    if (!buttonRef.current || !popupBoxRef.current) return
    const { top, left, height: btnH, width: btnW } = buttonRef.current.getBoundingClientRect()
    const popEle = popupBoxRef.current
    popEle.style.display = 'block'
    const popW = popEle.offsetWidth
    const popH = popEle.offsetHeight
    popEle.style.display = 'none'
    const fromTop = top - 4
    const fromBottom = window.innerHeight - top - btnH - 4
    const fromLeft = left + btnW
    const fromRight = window.innerWidth - left
    let originY = ''
    let originX = ''
    if (fromTop > popH && fromBottom < popH) {
      setBoxTop(top - 4 - popH)
      originY = 'bottom'
    } else {
      setBoxTop(top + btnH + 4)
      originY = 'top'
    }
    if (fromLeft > popW && fromRight < popW) {
      setBoxLeft(left + btnW - popW)
      originX = 'right'
    } else if (fromLeft < popW && fromRight < popW) {
      setBoxLeft((window.innerWidth - popW - 4) / 2)
      originX = ((left + btnW / 2) / window.innerWidth) * 100 + '%'
    } else {
      setBoxLeft(left)
      originX = 'left'
    }
    setOrigin(originX + ' ' + originY)
  }, [])

  const togglePopup = useCallback(
    function(ev: Event) {
      ev.stopPropagation()
      if (!finalShow) {
        if (beforeOpen) beforeOpen()
        calcPopupPos()
      }
      finalSetShow(!finalShow)
    },
    [finalShow, beforeOpen, calcPopupPos]
  )

  return (
    <Button ref={buttonRef} onClick={togglePopup} {...otherProps}>
      {children}
      {ReactDOM.createPortal(
        <div className='serverless-bbs'>
          <StyledAnimatedPopup
            onClick={stopPropagation}
            style={{
              top: boxTop,
              left: boxLeft,
              transformOrigin: origin,
              ...styles,
              display: styles.dspl.interpolate((display) => (display === 0 ? 'none' : 'block'))
            }}
            ref={popupBoxRef}
          >
            {popupContent()}
          </StyledAnimatedPopup>
        </div>,
        document.body
      )}
    </Button>
  )
}

export default PopupButton
