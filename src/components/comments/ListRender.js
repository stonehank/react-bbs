import React from 'react';
import styled from 'styled-components'
import MessageCard from "./MessageCard";

const BBSHr=styled.div`
    border-top: 1px dashed var(--bbs-text-muted)
`


function ListRender(props) {
    const {curNest, list,maxNest, updateCommentAsync, loadList} = props
    return (
        <section>
            {
                list.map((details, index) => (
                    <div
                        id={details.objectId}
                        key={details.objectId}
                    >
                        {index !== 0 && curNest === 0 ? <BBSHr /> : null}
                        <MessageCard
                            small={curNest > 0}
                            details={details}
                            curNest={curNest}
                            maxNest={maxNest}
                            updateCommentAsync={updateCommentAsync}
                            loadList={loadList}
                        />
                    </div>
                ))
            }
        </section>
    )
}

export default ListRender;
