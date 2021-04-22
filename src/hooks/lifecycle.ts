import { useEffect, useRef } from "react"

/**
 * @method useMount
 * @param  {()  => void} cb
 */
export function useMount(cb: () => void): void {
  useEffect(() => {
    cb && cb()
  }, [])

  return null
}

/**
 * @method useUnmount
 * @param  {()    => void} cb
 */
export function useUnmount(cb: () => void): void {
  useEffect(() => {
    return () => {
      cb()
    }
  }, [])

  return null
}
