import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PopupButton from "../../UI/PopupButton.tsx";
import avatarStyle from "./avatar.module.scss";
import crypto from 'blueimp-md5'
import useDidUpdate from "../../../hooks/useDidUpdate";

const StyledPopupButton=styled(PopupButton)`
    margin:0 0 16px 0;
    opacity:1;
`

function Avatar(props) {
    const {avatar,setAvatar,email,nickname,size}=props
    const [popupShow, setPopupShow]=useState(false)
    const [avatarsList, setAvatarsList]=useState([])
    // todo constant
    const GRAVATAR_URL='https://gravatar.loli.net/avatar'

    useEffect(()=>{
        let emailSrc=createEmailSrc()
        let nameSrc=createNameSrc()
        let others=["mp", "identicon", "monsterid",  "retro", "robohash", "wavatar"].map(str=>`${GRAVATAR_URL}/?d=${str}&size=${size}`)
        let newAvatarList=[emailSrc,nameSrc,...others]
        setAvatarsList(newAvatarList)
        if(avatar)return
        let rdAvatar=newAvatarList[Math.floor(Math.random() * newAvatarList.length)]
        setAvatar(rdAvatar)
    },[])

    useDidUpdate(()=>{
        console.log('update')
        updateAvatarList()
    },[email,nickname,size])

    function createEmailSrc(){
        return email
            ? `https://www.gravatar.com/avatar/${crypto(email.toLowerCase().trim())}?s=${size}`
            : `https://www.gravatar.com/avatar?s=${size}`
    }

    function createNameSrc(){
        return nickname
            ? `https://ui-avatars.com/api/?background=199ed9&color=fff&name=${nickname}&size=${size}`
            : `https://ui-avatars.com/api/?background=199ed9&color=fff&name=&size=${size}`
    }


    function updateAvatarList(){
        let emailSrc=createEmailSrc()
        let nameSrc=createNameSrc()
        if(email && nickname){
            setAvatarsList([emailSrc,nameSrc,...avatarsList.slice(2)])
        }else if(email){
            setAvatarsList([emailSrc,...avatarsList.slice(1)])
        }else if(nickname){
            setAvatarsList([avatarsList[0],nameSrc,...avatarsList.slice(2)])
        }
    }

    function chooseAvatar(src){
        return ()=>{
            setAvatar(src)
            setPopupShow(false)
        }
    }

    function generatePopupContent(){
        return (
            <div className={avatarStyle['avatar-panel-box']}>
                {
                    avatarsList.map((src,index)=>(
                        <div
                            className={avatarStyle['avatar-panel-item']}
                            key={index}
                            onClick={chooseAvatar(src)}
                            style={{
                                backgroundImage:'url('+src+')'
                            }}
                        />
                    ))
                }
            </div>
        )
    }

    return (
        <StyledPopupButton
            color={"error"}
            dense
            text
            show={popupShow}
            setShow={setPopupShow}
            beforeOpen={updateAvatarList}
            popupContent={generatePopupContent}
        >
            <img
                className={avatarStyle['bbs-avatar']}
                src={avatar}
                alt=""
            />
        </StyledPopupButton>
    );
}

Avatar.propTypes={
    avatar:PropTypes.string,
    email:PropTypes.string,
    nickname:PropTypes.string,
    size:PropTypes.number,
    setAvatar:PropTypes.func
}
Avatar.defaultProps={
    size:48,
    email:'',
    nickname:'',
    avatar:null,
}

function propsAreEqual(prevProps, nextProps) {
    // avatar,email,nickname,size
    return prevProps.avatar === nextProps.avatar
        && prevProps.email === nextProps.email
        && prevProps.nickname === nextProps.nickname
        && prevProps.size === nextProps.size
}
const MemoizedAvatar = React.memo(Avatar, propsAreEqual);

export default MemoizedAvatar;
