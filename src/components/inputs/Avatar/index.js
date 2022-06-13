import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PopupButton from "../../UI/PopupButton";
import avatarStyle from "./avatar.module.scss";
import crypto from 'blueimp-md5'

const StyledPopupButton=styled(PopupButton)`
    margin:0 0 16px 0;
    opacity:1;
`

function Avatar(props) {
    const {avatar,setAvatar,email,name,size}=props
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

    function createEmailSrc(){
        return email
            ? `https://www.gravatar.com/avatar/${crypto(email.toLowerCase().trim())}?s=${size}`
            : `https://www.gravatar.com/avatar?s=${size}`
    }

    function createNameSrc(){
        return name
            ? `https://ui-avatars.com/api/?background=199ed9&color=fff&name=${name}&size=${size}`
            : `https://ui-avatars.com/api/?background=199ed9&color=fff&name=&size=${size}`
    }


    function updateAvatarList(){
        if(email){
            setAvatarsList([createEmailSrc(),...avatarsList.slice(1)])
        }
        if(name){
            setAvatarsList([avatarsList[0],createNameSrc(),...avatarsList.slice(2)])
        }
    }
    function chooseAvatar(src){
        setAvatar(src)
        setPopupShow(false)
    }

    function generatePopupContent(){
        return (
            <div className={avatarStyle['avatar-panel-box']}>
                {
                    avatarsList.map((src,index)=>(
                        <div
                            className={avatarStyle['avatar-panel-item']}
                            key={index}
                            onClick={()=>chooseAvatar(src)}
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
    name:PropTypes.string,
    size:PropTypes.number,
    setAvatar:PropTypes.func
}
Avatar.defaultProps={
    size:48,
    email:'',
    name:'',
    avatar:null,
}

export default Avatar;
