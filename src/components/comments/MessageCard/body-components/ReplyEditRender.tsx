import React from 'react';
import clx from "classnames";
import messageBodyStyle from "../scss/message-body.module.scss";
import MessageRender from "../MessageRender";
import MessageInput from "../../../inputs/MessageInput";
import ActionsBar from "../../../actions/ActionsBar";
import {CommentObject} from "../../../../types";

type Props={
    details:CommentObject,
    edit:boolean,
    small:boolean,
    editMessage:string,
    setEditMessage:React.Dispatch<any>,
    editMessageRef:any,
    insertEmoji:(emoji:any)=>void
}

function ReplyEditRender({
                             details,
                             edit,
                             small,
                             editMessage,
                             setEditMessage,
                             editMessageRef,
                             insertEmoji
                         }:Props) {
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
function propsIsEqual(prev,next){
    for(let k in prev){
        if(!prev.hasOwnProperty(k))continue
        if(typeof prev[k]!=='function' && prev[k]!==next[k])return false
    }
    return true
}

export default React.memo(ReplyEditRender,propsIsEqual);
