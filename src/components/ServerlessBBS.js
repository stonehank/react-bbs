import React,{useState,useEffect} from 'react';
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import Button from "./UI/Button";
import PopupButton from "./UI/PopupButton";
import TextField from "./UI/TextField";
import Avatar from "./inputs/Avatar";
import Nickname from "./inputs/Nickname";
import Emoji from "./inputs/Emoji";
import ActionsBar from "./actions/ActionsBar";

function ServerlessBbs(props) {
    const [popupShow,setPopupShow]=useState(false)
    const [avatar,setAvatar]=useState(null)
    const [nickname,setNickname]=useState('')
    const nicknameRef=React.createRef(null)
    useEffect(()=>{
        console.log(nicknameRef.current.validate())
    },[])
    return (
        <section className="serverless-bbs">
            <Button>123</Button>
            <Button color="success">123</Button>
            <Button loading color="success">123</Button>
            <Button text color="success">text</Button>
            <Button loading={true} text color="success">text</Button>
            <Button disabled>disabled</Button>
            <Button dense text color="info">dense</Button>
            <PopupButton
                color={"error"}
                show={popupShow}
                setShow={setPopupShow}
                style={{marginLeft:100}}
                popupContent={()=><div style={{textAlign:'center',maxWidth:'100vw',width:320}}>1234</div>}
            >
                PopupButton
            </PopupButton>
            <TextField label={"input"} placeholder={"placeholder"} outlined={false} />
            <TextField label={"textarea"} placeholder={"placeholder"} rows={5}
                       rules={[
                           (v)=>!!v || 'Required',
                           (v)=>v.length > 20 || 'At least 20',
                       ]} />
               <Avatar
                   avatar={avatar}
                   setAvatar={setAvatar}
                   email={'stonehank310@gmail.com'}
                   name={'stonehank'}
               />
               <Nickname
                   ref={nicknameRef}
                   nickname={nickname}
                   setNickname={setNickname}
               />
               <Emoji
                   insertEmoji={(emoji)=>{console.log(emoji)}}
               />
               <ActionsBar
                   message={nickname}
                   replyId={null}
                   insertEmoji={(emoji)=>{console.log(emoji)}}
               />
        </section>
    );
}

export default ServerlessBbs;
