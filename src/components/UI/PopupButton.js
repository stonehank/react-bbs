import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom'
import Button from "./Button";
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'

const StyledPopup=styled(animated.div)`
        position:fixed;
        /*border:1px solid var(--bbs-separator-color);*/
        background: var(--bbs-separator-background);
        border-radius:6px;
        min-width:64px;
        min-height:64px;
        padding:4px 0;
        z-index: 99;
`

function PopupButton(props) {
    const {show,setShow,beforeOpen,popupContent,children,...otherProps}=props
    const popupBoxRef=React.createRef(null)
    const buttonRef=React.createRef(null)
    const [boxTop,setBoxTop]=useState(0)
    const [boxLeft,setBoxLeft]=useState(0)
    const [origin,setOrigin]=useState('top left')
    const [styles, api] = useSpring(() => ({
        from: { scale: 0, opacity: 0, dspl: 0 },
    }))

    useEffect(()=>{
        window.addEventListener('click',hide)
        window.addEventListener('resize',hide)
        return ()=>{
            window.removeEventListener('click',hide)
            window.removeEventListener('resize',hide)
        }
    },[])
    useEffect(()=>{
        api.start({
            scale: show? 1 : 0,
            opacity: show ? 1 : 0,
            dspl: show ? 1 : 0
        })

    },[show])

    function stopPropagation(ev){
        ev.stopPropagation();
    }
    function hide(){
        setShow(false)
    }
    function togglePopup(ev){
        ev.stopPropagation();
        if(!show){
            if(beforeOpen)beforeOpen()
            calcPopupPos()
        }
        setShow(!show)
    }

    function calcPopupPos(){
        if(!buttonRef.current || !popupBoxRef.current)return
        let {top,left,height:btnH, width:btnW}=buttonRef.current.getBoundingClientRect()
        let popEle=popupBoxRef.current
        popEle.style.display='block'
        let popW=popEle.offsetWidth
        let popH=popEle.offsetHeight
        popEle.style.display='none'
        let fromTop=top - 4
        let fromBottom=window.innerHeight - top - btnH - 4
        let fromLeft=left + btnW
        let fromRight=window.innerWidth - left
        let originY='', originX=''
        if(fromTop > popH && fromBottom < popH){
            setBoxTop(top - 4 - popH)
            originY='bottom'
        }else {
            setBoxTop(top + btnH + 4)
            originY='top'
        }
        if(fromLeft > popW && fromRight < popW){
            setBoxLeft(left + btnW - popW)
            originX='right'
        }else if(fromLeft < popW && fromRight < popW){
            setBoxLeft((window.innerWidth - popW -4) / 2)
            originX= ((left + btnW/2) / window.innerWidth * 100) + '%'
        }else{
            setBoxLeft(left)
            originX='left'
        }
        setOrigin(originX + ' ' +originY)
    }
    return (
        <Button
            ref={buttonRef}
            onClick={togglePopup}
            {...otherProps}
        >
            {children}
            {ReactDOM.createPortal(
                <div className={"serverless-bbs"}>
                    <StyledPopup
                        onClick={stopPropagation}
                        style={{
                            top:boxTop,
                            left:boxLeft,
                            transformOrigin:origin,
                            ...styles,
                            display: styles.dspl.interpolate((display) =>
                                display === 0 ? 'none' : 'block'
                            ),
                        }}
                        ref={popupBoxRef}
                    >
                        {popupContent()}
                    </StyledPopup>
                </div>,
                document.body
            )}
        </Button>
    );
}

PopupButton.propTypes={
    style:PropTypes.object,
    popupContent:PropTypes.func,
    show:PropTypes.bool,
    setShow:PropTypes.func,
    beforeOpen:PropTypes.func,
}


export default PopupButton;
