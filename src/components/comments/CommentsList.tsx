import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import CommentContext from "../../context/comments/CommentContext";
import ListRender from "./ListRender";
import MoreButton from "./MoreButton";
import Loading from "../UI/Loading";
import ReplyContext from "../../context/replys/ReplyContext";

const CommentsList=React.forwardRef((props,forwardRef)=>{
    const {
        maxNest,
        // uniqStr,
        // pageSize,
        // editable,
        loading,
        userLoading,
        list,
        // page,
        total,
        noMoreData,
        loadMore,
        loadList,
        updateCommentAsync,
        updateList,
        // updateReply
    }=useContext(CommentContext)
    const {
        updateReply,
    }=useContext(ReplyContext)

    React.useImperativeHandle(forwardRef,()=>({
        updateList,
        updateReply
    }))

    if(loading || userLoading){
        return(
            <div className="text-center" >
                <Loading size={48} />
            </div>
        )
    }

    return (
        <section>
            <p className={"text-md"}>
                评论数：<span>{total > 999 ? '999+' : total}</span>
            </p>
            <ListRender
                // define current layer
                curNest={0}
                maxNest={maxNest}
                updateCommentAsync={updateCommentAsync}
                list={list}
                loadList={loadList}
            />
            {
                noMoreData && list.length === 0
                    ?
                    <p className={"text-center text-secondary"}>还没有任何评论~</p>
                    :
                    <MoreButton
                        noMoreData={noMoreData}
                        loadMore={loadMore}
                    />
            }

        </section>
    );
})

export default CommentsList;
