import React, {useContext} from 'react';
import styled from "styled-components";
import MessageHead from "./MessageHead";
import MessageBody from "./MessageBody";

const BBSCommentCard = styled.div`
    margin:16px 0;
`
const BBSHr=styled.div`
    border-top: 1px dashed var(--bbs-text-muted)
`

function MessageCard(props) {
    const {
        index,
        details,
        small,
        curNest,
        maxNest,
        loadList,
        updateCommentAsync,
    } = props
    return (
        <div
            id={details.objectId}
        >
            {index !== 0 && curNest === 0 ? <BBSHr /> : null}
            <BBSCommentCard>
                <MessageHead small={small} details={details}/>
                <MessageBody
                    small={small}
                    details={details}
                    updateCommentAsync={updateCommentAsync}
                    // startReply={startReply}
                    // updateReplyDetails={updateReplyDetails}
                    // updateComment={updateComment}
                    loadList={loadList}
                    curNest={curNest}
                    maxNest={maxNest}
                />
            </BBSCommentCard>
        </div>
    )
}
function propsAreEqual(prevProps, nextProps) {
    return prevProps.details === nextProps.details
        && prevProps.curNest === nextProps.curNest
        && prevProps.small === nextProps.small
        && prevProps.maxNest === nextProps.maxNest
}
export default React.memo(MessageCard,propsAreEqual);
