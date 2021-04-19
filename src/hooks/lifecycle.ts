import { useEffect, useRef } from "react"

export function useMount(cb: Function) {
  useEffect(() => {
    cb && cb()
  }, [])
}

export function useUnmount(cb) {
  const isMounted = useRef<boolean>(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}
