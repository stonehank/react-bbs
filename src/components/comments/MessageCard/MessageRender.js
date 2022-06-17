import React, {useState, useEffect, useMemo, useRef} from 'react';
import clx from 'classnames'
import messageRenderStyle from './message-render.module.scss'
import {xssMarkdown} from "../../../utils/String";
import {addAtHTMLTag} from "../../../utils/handlerAtTag";

function MessageRender(props) {
    const {details} = props
    const renderMessageRef = useRef(null)
    const [showExpandBtn, setShowExpandBtn] = useState(false)

    const renderMessage = useMemo(() => {
        return addAtHTMLTag(xssMarkdown(details.message), details.replyId, details.at)
    }, [details.message, details.replyId, details.at])


    useEffect(() => {
        let renderEle = renderMessageRef.current
        if (renderEle.offsetHeight > 220) {
            setShowExpandBtn(true)
        }
    }, [])

    function showExpand() {
        if (!showExpandBtn) return
        setShowExpandBtn(false)
    }

    return (
        <div
            className={clx('markdown-body', {
                [messageRenderStyle.expand]: showExpandBtn
            })}
            onClick={showExpand}
            dangerouslySetInnerHTML={{__html: renderMessage}}
            ref={renderMessageRef}
        />
    )
}

export default MessageRender;
