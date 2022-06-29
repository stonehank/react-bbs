// eslint-disable-next-line no-unused-vars
import { DependencyList, useEffect, useRef } from 'react'

function useDidUpdate(callback: () => void, dependencies: DependencyList): void {
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    callback()
  }, dependencies)
}

export default useDidUpdate
