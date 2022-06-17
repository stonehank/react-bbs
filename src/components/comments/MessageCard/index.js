import React from 'react';
import styled from "styled-components";
import MessageHead from "./MessageHead";
import MessageBody from "./MessageBody";
// import MessageBody from "./MessageBody";

const BBSCommentCard = styled.div`
    margin:16px 0;
`


function MessageCard(props) {
    const {
        details,
        small,
        curNest,
        maxNest,
        loadList,
        updateCommentAsync,
    } = props
    console.log(details)
    return (
        <BBSCommentCard>
            <MessageHead small={small} details={details}/>
            <MessageBody
                small={small}
                details={details}
                updateCommentAsync={updateCommentAsync}
                loadList={loadList}
                curNest={curNest}
                maxNest={maxNest}
            />
        </BBSCommentCard>
    )
        ;
}

export default MessageCard;
