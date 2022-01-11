import React from 'react'

type voidFn = () => void

// sauce: https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/
const useTimeout = (callback: voidFn, delay: number | null): React.MutableRefObject<number | undefined> => {
    const timeoutRef = React.useRef<number | undefined>(undefined)
    const savedCallback = React.useRef<voidFn>(callback)
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    React.useEffect(() => {
        const tick: voidFn = () => savedCallback.current()
        if (typeof delay === 'number') {
            timeoutRef.current = window.setTimeout(tick, delay)
            return () => window.clearTimeout(timeoutRef.current)
        }
       
    }, [delay])
    return timeoutRef
}

// sauce: https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
const useInterval = (callback: voidFn, delay: number | null): React.MutableRefObject<number | undefined> => {
    const intervalRef = React.useRef<number | undefined>(undefined)
    const savedCallback = React.useRef<voidFn>(callback)
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    React.useEffect(() => {
        const tick: voidFn = () => savedCallback.current()
        if (typeof delay === 'number') {
            intervalRef.current = window.setInterval(tick, delay)
            return () => window.clearInterval(intervalRef.current)
        }
    }, [delay])
    return intervalRef
}

export { useTimeout, useInterval }
