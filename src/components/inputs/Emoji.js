import React from 'react';
import styled from 'styled-components'
import PopupButton from "../UI/PopupButton.tsx";
import emojiList from '../../assets/emoji.json'
import PropTypes from "prop-types";

const StyledPopupButton=styled(PopupButton)`
    padding-left:0;
    padding-right:0;
`

const EmojiBox=styled.div`
    font-size: 16px;
    text-align:justify;
    overflow: auto;
    width: 245px;
    height: 200px;
    display:flex;
    flex-flow:wrap;
    border-radius: 6px;
    user-select: none;
`

const EmojiItem=styled.span`
    font-style: normal;
    padding: 6px 0;
    width: 32px;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    transition:background .5s linear;
    &:hover{
        background:var(--bbs-info-color);
    }
`

function Emoji(props) {

    function onSelect(emoji){
        return function(){
            props.onSelect(emoji)
        }
    }
    return (
        <StyledPopupButton
            color="error"
            text
            dense
            popupContent={()=>(
                <EmojiBox>
                    {
                        Object.entries(emojiList).map(([name,emoji])=>(
                            <EmojiItem title={name} key={name} onClick={onSelect(emoji)}>
                                {emoji}
                            </EmojiItem>
                        ))
                    }
                </EmojiBox>
            )}
        >
            😄 表情
        </StyledPopupButton>
    );
}

Emoji.propTypes={
    onSelect:PropTypes.func
}

const MemoizedEmoji = React.memo(Emoji,()=>true);

export default MemoizedEmoji;
