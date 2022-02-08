import * as React from 'react'

type voidFn = () => void

// sauce: https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/
const useTimeout = (
	callback: voidFn,
	delay: number | null
): React.MutableRefObject<number | undefined> => {
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
const useInterval = (
	callback: voidFn,
	delay: number | null
): React.MutableRefObject<number | undefined> => {
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

// sauce: https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
const QUERY = '(prefers-reduced-motion: no-preference)'
const isRenderingOnServer = typeof window === 'undefined'
const getInitialState = () => {
	// For our initial server render, we won't know if the user
	// prefers reduced motion, but it doesn't matter. This value
	// will be overwritten on the client, before any animations
	// occur.
	return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] =
		React.useState(getInitialState)
	React.useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY)
		const listener = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(!event.matches)
		}
		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener('change', listener)
		} else {
			mediaQueryList.addListener(listener)
		}
		return () => {
			if (mediaQueryList.removeEventListener) {
				mediaQueryList.removeEventListener('change', listener)
			} else {
				mediaQueryList.removeListener(listener)
			}
		}
	}, [])
	return prefersReducedMotion
}

const useMediaQuery = (query: string): boolean => {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches
		}
		return false
	}

	const [matches, setMatches] = React.useState<boolean>(getMatches(query))

	function handleChange() {
		setMatches(getMatches(query))
	}

	React.useEffect(() => {
		const matchMedia = window.matchMedia(query)

		// Triggered at the first client-side load and if query changes
		handleChange()

		// Listen matchMedia
		matchMedia.addEventListener('change', handleChange)

		return () => {
			matchMedia.removeEventListener('change', handleChange)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return matches
}

export { useTimeout, useInterval, usePrefersReducedMotion, useMediaQuery }
