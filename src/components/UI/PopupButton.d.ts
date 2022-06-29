import React from 'react';
declare type Props = {
    style: any;
    popupContent: () => any;
    show: boolean;
    setShow: React.Dispatch<any>;
    beforeOpen: () => void;
    [x: string]: any;
};
declare function PopupButton(props: Props): JSX.Element;
export default PopupButton;
