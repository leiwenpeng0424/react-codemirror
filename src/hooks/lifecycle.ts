import { useEffect } from "react"

export function useMount(cb: Function) {
  useEffect(() => {
    cb && cb()
  }, [])
}
