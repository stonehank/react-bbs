import React, { useCallback, useState } from 'react'
import Loading from '../UI/Loading'
import Button from '../UI/Button'

type Props = {
  noMoreData: boolean;
  simple?: boolean;
  loadMore: any;
  align: string;
}

function MoreButton(props: Props) {
  const { align, noMoreData, simple, loadMore } = props
  const [moreLoading, setMoreLoading] = useState(false)

  const load = useCallback(
    function() {
      setMoreLoading(true)
      loadMore().finally(() => setMoreLoading(false))
    },
    [loadMore]
  )

  if (moreLoading) {
    return (
      <div className={'text-' + align}>
        <Loading size={24} />
      </div>
    )
  }
  if (noMoreData && simple) return null
  return (
    <div className={'text-' + align}>
      <Button
        disabled={noMoreData}
        text={noMoreData || simple}
        color={noMoreData ? 'secondary' : 'info'}
        dense={simple}
        onClick={load}
      >
        {noMoreData ? '没有更多了' : '查看更多'}
      </Button>
    </div>
  )
}

MoreButton.defaultProps = {
  simple: false,
  align: 'center'
}
export default MoreButton
