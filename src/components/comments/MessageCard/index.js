var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
import MessageHead from './MessageHead';
import MessageBody from './MessageBody';
var BBSCommentCard = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 16px 0;\n"], ["\n  margin: 16px 0;\n"])));
var BBSHr = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-top: 1px dashed var(--bbs-text-muted);\n"], ["\n  border-top: 1px dashed var(--bbs-text-muted);\n"])));
function MessageCard(props) {
    var index = props.index, details = props.details, small = props.small, curNest = props.curNest, maxNest = props.maxNest, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    return (React.createElement("div", { id: details.objectId },
        index !== 0 && curNest === 0 ? React.createElement(BBSHr, null) : null,
        React.createElement(BBSCommentCard, null,
            React.createElement(MessageHead, { small: small, details: details }),
            React.createElement(MessageBody, { small: small, details: details, updateCommentAsync: updateCommentAsync, loadList: loadList, curNest: curNest, maxNest: maxNest }))));
}
function propsAreEqual(prevProps, nextProps) {
    return (prevProps.details.objectId === nextProps.details.objectId &&
        prevProps.details.nickname === nextProps.details.nickname &&
        prevProps.details.at === nextProps.details.at &&
        prevProps.details.avatar === nextProps.details.avatar &&
        prevProps.details.message === nextProps.details.message &&
        prevProps.details.replyCounts === nextProps.details.replyCounts &&
        prevProps.curNest === nextProps.curNest &&
        prevProps.small === nextProps.small &&
        prevProps.maxNest === nextProps.maxNest);
}
export default React.memo(MessageCard, propsAreEqual);
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map