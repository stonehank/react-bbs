// eslint-disable-next-line no-unused-vars
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react'

function useSyncState<S>(initialState: S): [S, MutableRefObject<S>, Dispatch<SetStateAction<S>>] {
  const [state, _setState] = useState(initialState)
  const syncState = useRef(initialState)

  function setState(newState: S): void {
    _setState(newState)
    syncState.current = newState
  }

  return [state, syncState, setState]
}

export default useSyncState
