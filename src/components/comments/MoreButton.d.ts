/// <reference types="react" />
declare type Props = {
    noMoreData: boolean;
    simple?: boolean;
    loadMore: any;
    align: string;
};
declare function MoreButton(props: Props): JSX.Element;
declare namespace MoreButton {
    var defaultProps: {
        simple: boolean;
        align: string;
    };
}
export default MoreButton;
