import React,{useMemo} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { xssMarkdown} from "../../utils/String";
import {addAtHTMLTag,convertToPureMessage} from "../../utils/handlerAtTag";

const StyledPreviewRender=styled.div`
    padding: 8px;
    font-size: 16px;
    background: var(--bbs-background-color);
    border: 1px dashed var(--bbs-separator-color);
    border-radius: 4px;
`

function PreviewRender(props) {
    const {message,at,replyId,preview} = props

    if(!preview)return null

    const previewMessage = useMemo(()=>(
        addAtHTMLTag(xssMarkdown(convertToPureMessage(message,at)),replyId,at)
    ),[message,at,replyId])

    return (
        <StyledPreviewRender
            className={"markdown-body"}
            dangerouslySetInnerHTML={{
                __html:previewMessage.trim()===''
                    ? '<span class="text-muted">无内容</span>'
                    : previewMessage
            }}
        >

        </StyledPreviewRender>
    );
}
PreviewRender.protoTypes={
    preview:PropTypes.bool,
    message:PropTypes.string,
    replyId:PropTypes.string,
    at:PropTypes.string,
}

export default PreviewRender;
