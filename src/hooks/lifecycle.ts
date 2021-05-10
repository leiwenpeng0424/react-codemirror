import { useEffect } from "react"

/**
 * hooks for mount callback
 * @param cb
 * @returns
 */
export function useMount(cb: () => void): void {
  useEffect(() => {
    cb && cb()
  }, [])

  return null
}

/**
 * hook for unmount callback
 * @param cb
 * @returns
 */
export function useUnmount(cb: () => void): void {
  useEffect(() => {
    return () => {
      cb()
    }
  }, [])

  return null
}
