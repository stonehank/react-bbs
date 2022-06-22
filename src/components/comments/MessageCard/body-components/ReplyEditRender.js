import React from 'react';
import clx from "classnames";
import messageBodyStyle from "../scss/message-body.module.scss";
import MessageRender from "../MessageRender";
import MessageInput from "../../../inputs/MessageInput";
import ActionsBar from "../../../actions/ActionsBar";

function ReplyEditRender({
                             details,
                             edit,
                             small,
                             editMessage,
                             setEditMessage,
                             editMessageRef,
                             insertEmoji
                         }) {
    return (
        <div
            className={clx(messageBodyStyle["bbs-msg-body"], {
                [messageBodyStyle["msg-small"]]: small,
            })}
        >
            {!edit
                ?
                <MessageRender details={details}/>
                :
                <div>
                    <MessageInput
                        message={editMessage}
                        setMessage={setEditMessage}
                        ref={editMessageRef}
                        label={"编辑内容"}
                        rows={3}
                    />
                    <ActionsBar
                        message={editMessage}
                        insertEmoji={insertEmoji}
                        replyId={details.replyId}
                        at={details.at}
                    />
                </div>
            }

        </div>
    );
}

export default ReplyEditRender;
