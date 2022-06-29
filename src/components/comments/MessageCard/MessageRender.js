import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import clx from 'classnames';
import messageRenderStyle from './scss/message-render.module.scss';
import { xssMarkdown } from '../../../utils/String';
import { addAtHTMLTag } from '../../../utils/handlerAtTag';
function MessageRender(props) {
    var _a;
    var details = props.details;
    var renderMessageRef = useRef(null);
    var _b = useState(false), showExpandBtn = _b[0], setShowExpandBtn = _b[1];
    var renderMessage = useMemo(function () {
        return addAtHTMLTag(xssMarkdown(details.message), details.replyId, details.at);
    }, [details.message, details.replyId, details.at]);
    useEffect(function () {
        var renderEle = renderMessageRef.current;
        if (renderEle.offsetHeight > 220) {
            setShowExpandBtn(true);
        }
    }, []);
    var showExpand = useCallback(function () {
        if (!showExpandBtn)
            return;
        setShowExpandBtn(false);
    }, [showExpandBtn]);
    return (React.createElement("div", { className: clx('markdown-body', (_a = {},
            _a[messageRenderStyle.expand] = showExpandBtn,
            _a)), onClick: showExpand, dangerouslySetInnerHTML: { __html: renderMessage }, ref: renderMessageRef }));
}
export default React.memo(MessageRender);
//# sourceMappingURL=MessageRender.js.map