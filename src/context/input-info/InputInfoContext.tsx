import * as React from "react";
import {ConfigInfo, UserInfo, ReplyInfo} from "../../types";

type InputInfo={
    setAvatar,
    setEmail,
    setNickname,
    bbsInputBoxRef,
    messageEleRef,
    startReply,
    cancelReply,
    message,
    setMessage,
} & ConfigInfo & UserInfo & ReplyInfo

const InputInfoContext=React.createContext<InputInfo | null>(null)

export default InputInfoContext
