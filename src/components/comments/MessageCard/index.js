import React from 'react';
import styled from "styled-components";
import MessageHead from "./MessageHead";
import MessageBody from "./MessageBody";
import ReplyProvider from "../../../context/replys/ReplyProvider";

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
    return (
        <BBSCommentCard>
            <MessageHead small={small} details={details}/>
            <ReplyProvider
                small={small}
                details={details}
                updateCommentAsync={updateCommentAsync}
                loadList={loadList}
                curNest={curNest}
                maxNest={maxNest}
            >
                <MessageBody />
            </ReplyProvider>
        </BBSCommentCard>
    )
        ;
}

export default MessageCard;
