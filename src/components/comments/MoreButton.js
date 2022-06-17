import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Loading from "../UI/Loading";
import Button from "../UI/Button";

function MoreButton(props) {
    const {align, noMoreData,simple, loadMore} = props
    const [moreLoading, setMoreLoading]=useState(false)
    function load(){
        setMoreLoading(true)
        loadMore().finally(()=>setMoreLoading(false))
    }
    return (
        <div className={'text-'+align}>
            {moreLoading
                ?
                <Loading size={48} />
                :
                <Button
                    disabled={noMoreData}
                    text={noMoreData || simple}
                    color={noMoreData ? 'secondary' : 'info'}
                    dense={simple}
                    onClick={load}
                >
                    { noMoreData ? '没有更多了' : '查看更多' }
                </Button>
            }
        </div>
    );
}
MoreButton.propTypes={
    noMoreData:PropTypes.bool,
    simple:PropTypes.bool,
    loadMore:PropTypes.func,
    align:PropTypes.string
}
MoreButton.defaultTypes={
    align:'center'
}
export default MoreButton;
