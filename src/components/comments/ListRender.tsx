import React from 'react'
import MessageCard from './MessageCard'

function ListRender(props) {
  const { curNest, list, maxNest, updateCommentAsync, loadList } = props
  return (
    <section>
      {list.map((details, index) => (
        <MessageCard
          key={details.objectId}
          index={index}
          small={curNest > 0}
          details={details}
          curNest={curNest}
          maxNest={maxNest}
          updateCommentAsync={updateCommentAsync}
          loadList={loadList}
        />
      ))}
    </section>
  )
}

export default React.memo(ListRender)
