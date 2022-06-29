/// <reference types="react" />
declare type Props = {
    preview: boolean;
    message: string;
    replyId: string;
    at: string;
};
declare function PreviewRender(props: Props): JSX.Element;
export default PreviewRender;
