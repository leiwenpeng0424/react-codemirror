import { useEffect, useRef } from "react"

/**
 * cancel timeout after delay change
 * @param fn
 * @param delay
 */
export default function useTimeout(fn, delay = 100) {
  const { current: callback } = useRef<() => void>(fn)
  let { current: timer } = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => callback(), delay)
  }, [delay])
}
