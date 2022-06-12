import React from 'react';
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import '../assets/css/textfield/common.scss'
import Button from "./UI/Button";
import PopupButton from "./UI/PopupButton";

function ServerlessBbs(props) {
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
                style={{marginLeft:100}}
                popupContent={()=><div style={{maxWidth:'100vw',width:320}}>1234</div>}
            >
                PopupButton
            </PopupButton>
        </section>
    );
}

export default ServerlessBbs;
