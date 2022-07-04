var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { xssMarkdown } from '../../utils/String';
import { addAtHTMLTag, convertToPureMessage } from '../../utils/handlerAtTag';
var StyledPreviewRender = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 8px;\n  font-size: 16px;\n  background: var(--bbs-background-color);\n  border: 1px dashed var(--bbs-separator-color);\n  border-radius: 4px;\n"], ["\n  padding: 8px;\n  font-size: 16px;\n  background: var(--bbs-background-color);\n  border: 1px dashed var(--bbs-separator-color);\n  border-radius: 4px;\n"])));
function PreviewRender(props) {
    var message = props.message, at = props.at, replyId = props.replyId, preview = props.preview;
    if (!preview)
        return null;
    var previewMessage = useMemo(function () { return addAtHTMLTag(xssMarkdown(convertToPureMessage(message, at)), replyId, at); }, [
        message,
        at,
        replyId
    ]);
    return (React.createElement(StyledPreviewRender, { className: 'markdown-body', dangerouslySetInnerHTML: {
            __html: previewMessage.trim() === '' ? '<span class="text-muted">无内容</span>' : previewMessage
        } }));
}
export default PreviewRender;
var templateObject_1;
//# sourceMappingURL=PreviewRender.js.map